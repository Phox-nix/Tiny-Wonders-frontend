'use client';

import { useRouter } from 'next/navigation';
import styles from './ArticleBackButton.module.scss';

const ArticleBackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/news');
    }
  };

  return (
    <button onClick={() => router.back()} className={styles.backButton} aria-label="Go back">
      ←
    </button>
  );
};

export default ArticleBackButton;
