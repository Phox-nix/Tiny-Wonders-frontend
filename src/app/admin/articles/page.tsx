'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllArticlesAdmin, deleteArticle } from '@/services/adminService';
import { NewsArticle } from '@/types/news';
import styles from './articles.module.scss';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = () => {
    getAllArticlesAdmin()
      .then((res) => {
        setArticles(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Articles</h1>
        <Link href="/admin/articles/new" className={styles.newButton}>
          New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className={styles.empty}>
          <p>No articles yet.</p>
          <Link href="/admin/articles/new">Create your first article</Link>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          {articles.map((article) => (
            <div key={article.id} className={styles.tableRow}>
              <span className={styles.articleTitle}>{article.title}</span>
              <span>{article.categoryName || '—'}</span>
              <span>
                <span
                  className={`${styles.badge} ${article.isPublished ? styles.published : styles.draft}`}>
                  {article.isPublished ? 'Published' : 'Draft'}
                </span>
              </span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              <div className={styles.actions}>
                <Link href={`/admin/articles/${article.id}/edit`} className={styles.editButton}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article.id, article.title)}
                  className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
