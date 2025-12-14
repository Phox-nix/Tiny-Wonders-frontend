import AppContainer from '@/components/AppContainer/AppContainer';
import AppFooter from '@/components/AppFooter/AppFooter';
import AppHeader from '@/components/AppHeader/AppHeader';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
