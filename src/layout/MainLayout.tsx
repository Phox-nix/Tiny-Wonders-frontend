'use client';

import AppFooter from '@/components/AppFooter/AppFooter';
import AppHeader from '@/components/AppHeader/AppHeader';
import { PropsWithChildren } from 'react';
import '@/assets/styles/main.scss';
import styles from './MainLayout.module.scss';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
