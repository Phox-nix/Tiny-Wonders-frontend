import ArticleInsideView from '@/modules/news/view/ArticleInsideView';
import { getArticleById } from '@/services/news';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticleInsidePage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const response = await getArticleById(slug);
    return <ArticleInsideView article={response.data} />;
  } catch {
    notFound();
  }
}
