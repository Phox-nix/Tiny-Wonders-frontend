'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import { getArticles } from '@/services/news';
import { NewsArticle } from '@/types/news';
import styles from './FeaturedSlider.module.scss';

const FeaturedSlider = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res.data.slice(0, 4));
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.arrows}>
          <button className="swiper-button-prev-custom">←</button>
          <button className="swiper-button-next-custom">→</button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        spaceBetween={32}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}>
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <ArticleCard
              key={article.id}
              id={article.id}
              coverImageUrl={article.coverImageUrl}
              title={article.title}
              content={article.content}
              createdAt={article.createdAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedSlider;
