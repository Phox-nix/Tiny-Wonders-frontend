import styles from './FeaturedSection.module.scss';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import ButtonLink from '@/components/ButtonLink/ButtonLink';

const FeaturedSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Latest Wonders</h2>
        <p>Join other wonderers around the globe.</p>
      </div>
      <div className={styles.cards}>
        <ArticleCard
          image="/latestwander-1.svg"
          title="Why Does Time Feel Faster As We Age?"
          excerpt="As kids, one year feels huge. As adults, it..."
        />
        <ArticleCard
          image="/latestwander-2.svg"
          title="A Day on Venus Is Longer Than a Year"
          excerpt="On Venus, one full spin on its axis takes longer than its trip around the..."
        />
        <ArticleCard
          image="/latestwander-3.svg"
          title="Trees Can Comunicate With Each Other"
          excerpt="Trees send nutrients and warnings through underground fungal networks..."
        />
      </div>
      <div className={styles.button}>
        <ButtonLink href="/articles" className={styles.inbutton}>
          {' '}
          View
        </ButtonLink>
      </div>
    </section>
  );
};

export default FeaturedSection;
