'use client';
import { usePathname } from 'next/navigation';
import AppContainer from '@/components/AppContainer/AppContainer';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from '@/components/AppHeader/AppHeader.module.scss';
import Link from 'next/link';

const AppHeader = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  return (
    <div
      className={`${styles.AppHeader} ${isLanding ? styles.headerLanding : styles.headerDefault}`}>
      <AppContainer>
        <div className={styles.AppHeader__Wrapper}>
          <div>
            <Link href="/" className="AppHeader__logo-link">
              <img src="/logo.svg" alt="logo" className="AppHeader__logo" />
            </Link>
          </div>

          <nav
            className={`${styles.AppHeader__Nav} ${
              isLanding ? styles.navLanding : styles.navDefault
            }`}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/news">Articles</Link>
              </li>
              <li>
                <ButtonLink href="/about">About Us</ButtonLink>
              </li>
            </ul>
          </nav>
        </div>
      </AppContainer>
    </div>
  );
};

export default AppHeader;
