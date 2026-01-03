'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import styles from './NewsView.module.scss';
import { getNews } from '@/services/news';
import { NewsArticle } from '@/types/news';

const NewsView = () => {
  const articlesPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    getNews().then((res) => {
      setArticles(res.data);
    });
  }, []);

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Latest Articles</h1>

      <div className={styles.grid}>
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            image={article.image}
            title={article.title}
            excerpt={article.excerpt}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-${i + 1}`}
            onClick={() => setCurrentPage(i + 1)}
            className={i + 1 === currentPage ? styles.active : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default NewsView;
