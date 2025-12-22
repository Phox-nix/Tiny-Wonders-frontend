import Link from 'next/link';
import styles from './ArticleCard.module.scss';

type ArticleCardProps = {
  id: string;
  image: string;
  title: string;
  excerpt: string;
};

const ArticleCard = ({ id, image, title, excerpt }: ArticleCardProps) => {
  return (
    <Link href={`/news/${id}`} className={styles.link}>
      <article className={styles.card}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </article>
    </Link>
  );
};

export default ArticleCard;
