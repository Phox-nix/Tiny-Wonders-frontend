import styles from './FeaturedSection.module.scss';
import ArticleCard from '@/modules/news/components/ArticleCard/ArticleCard';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import FeaturedSlider from '@/components/FeaturedSlider/FeaturedSlider';

const FeaturedSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Latest Wonders</h2>
        <p>Join other wonderers around the globe.</p>
      </div>
      <div className={styles.sliderWrapper}>
        <FeaturedSlider />
      </div>
      <div className={styles.button}>
        <ButtonLink href="/news" className={styles.inbutton}>
          View
        </ButtonLink>
      </div>
    </section>
  );
};

export default FeaturedSection;
