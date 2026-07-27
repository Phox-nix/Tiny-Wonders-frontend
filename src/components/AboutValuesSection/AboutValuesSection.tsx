import styles from './AboutValuesSection.module.scss';

const values = [
  {
    icon: '/icon2.svg',
    title: 'Curiosity First',
    text: 'I believe curiosity is the spark behind all learning. My goal is to inspire questions, not just provide answers.',
  },
  {
    icon: '/icon3.svg',
    title: 'Personal & Growth',
    text: 'Authenticity is the driving force of our happiness, with these posts i hope to encourage you to express yourself in your way.',
  },
  {
    icon: '/icon1.svg',
    title: 'Wonder in the Everyday',
    text: 'The world is full of unnoticed beauty and strange little truths. We exist to help people notice them.',
  },
];

const AboutValuesSection = () => {
  return (
    <section className={styles.section}>
      <h2>Our Values</h2>

      <div className={styles.grid}>
        {values.map((value) => (
          <div key={value.title} className={styles.card}>
            <img src={value.icon} alt="" />
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutValuesSection;
