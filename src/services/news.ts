import api from '@/lib/axios';
import { NewsArticle, Comment } from '@/types/news';

export const getArticles = (categoryId?: string) => {
  const params = categoryId ? { categoryId } : {};
  return api.get<NewsArticle[]>('/articles', { params });
};

export const getArticleById = (id: string) => {
  return api.get<NewsArticle>(`/articles/${id}`);
};

export const getComments = (articleId: string) => {
  return api.get<Comment[]>(`/articles/${articleId}/comments`);
};

export const createComment = (articleId: string, content: string) => {
  return api.post<Comment>(`/articles/${articleId}/comments`, { content });
};

export const deleteComment = (articleId: string, commentId: string) => {
  return api.delete(`/articles/${articleId}/comments/${commentId}`);
};
