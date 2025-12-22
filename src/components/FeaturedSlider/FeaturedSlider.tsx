'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';

const mockArticles = [
  {
    id: '1',
    title: 'Why Does Time Feel Faster As We Age?',
    excerpt: 'As kids, one year feels huge. As adults, it...',
    image: '/latestwander-1.svg',
  },
  {
    id: '2',
    title: 'A Day on Venus Is Longer Than a Year',
    excerpt: 'On Venus, one full spin on its axis takes longer than its trip around the...',
    image: '/latestwander-2.svg',
  },
  {
    id: '3',
    title: 'Trees Can Communicate With Each Other',
    excerpt: 'Trees send nutrients and warnings through underground fungal networks...',
    image: '/latestwander-3.svg',
  },
  {
    id: '4',
    title: 'The Eiffel Tower Can Be 15 cm Taller During the Summer',
    excerpt: 'When a substance is heated up, its particles move more and it takes ...',
    image: '/latestwander-5.svg',
  },
];

const FeaturedSlider = () => {
  return (
    <Swiper
      style={{ width: '100%', paddingBottom: '40px' }}
      spaceBetween={32}
      slidesPerView={3}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}>
      {mockArticles.map((article) => (
        <SwiperSlide key={article.id}>
          <ArticleCard {...article} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedSlider;
