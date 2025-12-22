'use client';

import styles from './ArticleInsideView.module.scss';

interface ArticleInsideProps {
  title: string;
  content: string;
  image: string;
}

const ArticleInsideView = ({ title, content, image }: ArticleInsideProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.text}>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
};

export default ArticleInsideView;
