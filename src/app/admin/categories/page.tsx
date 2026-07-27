'use client';

import { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '@/services/adminService';
import { Category } from '@/types/news';
import styles from './categories.module.scss';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setIsSubmitting(true);
      setError('');
      const response = await createCategory(newCategoryName);
      setCategories((prev) => [...prev, response.data]);
      setNewCategoryName('');
    } catch {
      setError('Failed to create category. It may already exist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError('Failed to delete category.');
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div>
      <h1 className={styles.title}>Categories</h1>

      <div className={styles.createForm}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <button
          onClick={handleCreate}
          disabled={isSubmitting || !newCategoryName.trim()}
          className={styles.createButton}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {categories.length === 0 ? (
        <div className={styles.empty}>
          <p>No categories yet. Create your first one above.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {categories.map((category) => (
            <div key={category.id} className={styles.item}>
              <div>
                <p className={styles.categoryName}>{category.name}</p>
                <p className={styles.categorySlug}>/{category.slug}</p>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.count}>
                  {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
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
