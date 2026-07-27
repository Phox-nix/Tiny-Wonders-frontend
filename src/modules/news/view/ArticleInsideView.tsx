'use client';

import ArticleBackButton from '@/components/ArticleBackButton/ArticleBackButton';
import Comments from '@/modules/news/components/Comments/Comments';
import styles from './ArticleInsideView.module.scss';
import { NewsArticle } from '@/types/news';

const ArticleInsideView = ({ article }: { article: NewsArticle }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ArticleBackButton />
        {article.coverImageUrl && (
          <div className={styles.image}>
            <img src={article.coverImageUrl} alt={article.title} />
          </div>
        )}
        <div className={styles.text}>
          <div className={styles.meta}>
            <span>{article.authorName}</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            {article.categoryName && <span>{article.categoryName}</span>}
          </div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </div>
        <Comments articleId={article.id} />
      </div>
    </section>
  );
};

export default ArticleInsideView;
