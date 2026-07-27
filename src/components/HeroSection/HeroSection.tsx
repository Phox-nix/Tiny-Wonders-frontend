import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Tiny Wonders</h1>
        <p>Reads about big ideas, quiet mysteries and hidden patterns of our world and mind.</p>
      </div>
    </section>
  );
};

export default HeroSection;
