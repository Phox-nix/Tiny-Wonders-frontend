'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleInsideView from '@/modules/news/view/ArticleInsideView';
import { getArticleById } from '@/services/news';
import { NewsArticle } from '@/types/news';

export default function ArticleInsidePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getArticleById(slug)
      .then((res) => setArticle(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return <p>Article not found.</p>;
  }

  if (!article) {
    return <p>Loading...</p>;
  }

  return <ArticleInsideView article={article} />;
}
