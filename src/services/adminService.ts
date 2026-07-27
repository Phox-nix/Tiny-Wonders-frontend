import api from '@/lib/axios';
import { NewsArticle, Category } from '@/types/news';

export const getAllArticlesAdmin = () => {
  return api.get<NewsArticle[]>('/articles/admin');
};

export const createArticle = (data: {
  title: string;
  content: string;
  categoryId?: string;
  isPublished: boolean;
}) => {
  return api.post<NewsArticle>('/articles', data);
};

export const updateArticle = (
  id: string,
  data: {
    title: string;
    content: string;
    categoryId?: string;
    isPublished: boolean;
  },
) => {
  return api.put<NewsArticle>(`/articles/${id}`, data);
};

export const updateArticleImage = (id: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.patch<NewsArticle>(`/articles/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteArticle = (id: string) => {
  return api.delete(`/articles/${id}`);
};

export const getCategories = () => {
  return api.get<Category[]>('/categories');
};

export const createCategory = (name: string) => {
  return api.post<Category>('/categories', { name });
};

export const deleteCategory = (id: string) => {
  return api.delete(`/categories/${id}`);
};
