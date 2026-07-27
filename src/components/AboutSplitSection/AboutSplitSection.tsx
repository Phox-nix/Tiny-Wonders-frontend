import styles from './AboutSplitSection.module.scss';

const AboutSplitSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <img src="/icon1.svg" alt="" />
          <h2>About Tiny Wonders</h2>
          <p>
            Tiny Wonders is a blog of short, fascinating facts about the universe, nature, the human
            mind, and the strange systems behind everyday life. My goal is simple: to make learning
            feel soft, beautiful, and enjoyable — even when the topic is complex. Occasionally
            turning my own thoughts and ideas into text to navigate myself through the everchanging
            currents of life.
          </p>
        </div>

        <div className={styles.image}>
          <img src="/aboutsectionphoto.svg" alt="About us" />
        </div>
      </div>
    </section>
  );
};
export default AboutSplitSection;
