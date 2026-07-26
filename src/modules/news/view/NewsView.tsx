'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import styles from './NewsView.module.scss';
import { getArticles } from '@/services/news';
import { NewsArticle } from '@/types/news';

const NewsView = () => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setArticles(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h1 className={styles.title}>Latest Articles</h1>
        <p>Loading articles...</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Latest Articles</h1>
      <div className={styles.grid}>
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            coverImageUrl={article.coverImageUrl}
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
          />
        ))}
      </div>
      {totalPages > 1 && (
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
      )}
    </section>
  );
};

export default NewsView;
