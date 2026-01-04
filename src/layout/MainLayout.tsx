import AppFooter from '@/components/AppFooter/AppFooter';
import AppHeader from '@/components/AppHeader/AppHeader';
import { PropsWithChildren } from 'react';
import '@/assets/styles/main.scss';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
