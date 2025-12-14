import styles from './ArticleCard.module.scss';

type ArticleCardProps = {
  image: string;
  title: string;
  excerpt: string;
};

const ArticleCard = ({ image, title, excerpt }: ArticleCardProps) => {
  return (
    <article className={styles.card}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </article>
  );
};

export default ArticleCard;
