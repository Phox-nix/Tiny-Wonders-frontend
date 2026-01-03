import AppFooter from '@/components/AppFooter/AppFooter';
import AppHeader from '@/components/AppHeader/AppHeader';
import { PropsWithChildren } from 'react';
import '@/assets/styles/main.scss';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-layout">
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
