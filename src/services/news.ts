import api from '@/lib/axios';

export const getNews = () => {
  return api.get('/news');
};
