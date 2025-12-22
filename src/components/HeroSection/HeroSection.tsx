import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Tiny Wonders</h1>
        <p>Short reads about big ideas,hidden patterns,and the quiet mysteries of our world.</p>
      </div>
    </section>
  );
};

export default HeroSection;
