'use client';

import { useState } from 'react';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import styles from './NewsView.module.scss';

const allArticles = [
  {
    id: '1',
    title: 'Why Does Time Feel Faster As We Age?',
    excerpt: 'As kids, one year feels huge. As adults, it...',
    image: '/latestwander-1.svg',
  },
  {
    id: '2',
    title: 'A Day on Venus Is Longer Than a Year',
    excerpt: 'On Venus, one full spin on its axis takes longer than its trip around the sun...',
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
    title: 'Octopuses Have Three Hearts',
    excerpt: 'Two pump blood to the gills, one to the body...',
    image: '/latestwander-7.svg',
  },
  {
    id: '5',
    title: 'Black Holes Sing',
    excerpt: 'Sound waves propagate through hot gas around black holes...',
    image: '/latestwander-2.svg',
  },
  {
    id: '6',
    title: 'Your Brain Predicts the Future',
    excerpt: 'The brain constantly guesses what will happen next...',
    image: '/latestwander-1.svg',
  },
  {
    id: '7',
    title: 'Your Brain Predicts the Future',
    excerpt: 'The brain constantly guesses what will happen next...',
    image: '/latestwander-7.svg',
  },
  {
    id: '8',
    title: 'Your Brain Predicts the Future',
    excerpt: 'The brain constantly guesses what will happen next...',
    image: '/latestwander-1.svg',
  },
  {
    id: '9',
    title: 'Your Brain Predicts the Future',
    excerpt: 'The brain constantly guesses what will happen next...',
    image: '/latestwander-2.svg',
  },
];

const NewsView = () => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = allArticles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

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
            key={i}
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
