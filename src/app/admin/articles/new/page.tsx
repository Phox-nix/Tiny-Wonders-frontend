'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, updateArticleImage, getCategories } from '@/services/adminService';
import { Category } from '@/types/news';
import styles from '../editor.module.scss';

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const response = await createArticle({
        title,
        content,
        categoryId: categoryId || undefined,
        isPublished,
      });

      if (imageFile) {
        await updateArticleImage(response.data.id, imageFile);
      }

      router.push('/admin/articles');
    } catch {
      setError('Failed to create article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>New article</h1>
        <div className={styles.actions}>
          <button onClick={() => router.push('/admin/articles')} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting} className={styles.saveButton}>
            {isSubmitting ? 'Saving...' : 'Save article'}
          </button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.form}>
        <div className={styles.main}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here..."
              className={styles.textarea}
              rows={20}
            />
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>Publish</h3>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <span>{isPublished ? 'Published' : 'Draft'}</span>
            </label>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Category</h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={styles.select}>
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Cover image</h3>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className={styles.fileInput}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
