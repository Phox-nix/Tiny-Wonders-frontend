import Link from 'next/link';
import styles from './ArticleCard.module.scss';

type ArticleCardProps = {
  id: string;
  coverImageUrl?: string;
  title: string;
  content: string;
  createdAt: string;
};

const ArticleCard = ({ id, coverImageUrl, title, content, createdAt }: ArticleCardProps) => {
  const excerpt = content.length > 150 ? content.slice(0, 150) + '...' : content;

  return (
    <Link href={`/news/${id}`} className={styles.link}>
      <article className={styles.card}>
        {coverImageUrl ? (
          <img src={coverImageUrl} alt={title} />
        ) : (
          <div className={styles.placeholder} />
        )}
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <span className={styles.date}>{new Date(createdAt).toLocaleDateString()}</span>
      </article>
    </Link>
  );
};

export default ArticleCard;
