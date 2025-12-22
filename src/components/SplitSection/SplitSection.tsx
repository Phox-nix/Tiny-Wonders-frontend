import ButtonLink from '@/components/ButtonLink/ButtonLink';
import styles from './SplitSection.module.scss';

const SplitSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2>About Tiny Wonders</h2>
          <p>
            Tiny Wonders is a blog of short, fascinating facts about the universe, nature, the human
            mind, and the strange systems behind everyday life. Our goal is simple: to make learning
            feel soft, beautiful, and enjoyable — even when the topic is complex. Each post is
            designed to be read in under a minute, because curiosity shouldn’t feel heavy.
          </p>
          <ButtonLink href="/about" className={styles.button}>
            Show More
          </ButtonLink>
        </div>
        <div className={styles.right}>
          <img src="/About-Us-Photo.svg" alt="About Us preview" />
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
