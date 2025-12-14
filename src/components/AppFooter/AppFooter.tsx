import Link from 'next/link';
import styles from './AppFooter.module.scss';

const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/logo.svg" alt="logo" />
          <span>Tiny Wonders</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/about">About Us</Link>
          <Link href="/articles">Articles</Link>
        </nav>
      </div>
    </footer>
  );
};

export default AppFooter;
