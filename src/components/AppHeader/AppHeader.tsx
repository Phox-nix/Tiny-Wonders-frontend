'use client';
import { usePathname, useRouter } from 'next/navigation';
import AppContainer from '@/components/AppContainer/AppContainer';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from '@/components/AppHeader/AppHeader.module.scss';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import { logout } from '@/services/authService';

const AppHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLanding = pathname === '/';
  const { isAuthenticated, isAdmin, user, logout: logoutStore } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      logoutStore();
      router.push('/');
    }
  };

  return (
    <header
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
                <Link href="/" className={pathname === '/' ? styles.active : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className={pathname.startsWith('/news') ? styles.active : ''}>
                  Articles
                </Link>
              </li>
              <li>
                <ButtonLink href="/about">About Us</ButtonLink>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className={pathname.startsWith('/admin') ? styles.active : ''}>
                    Admin
                  </Link>
                </li>
              )}
              {isAuthenticated ? (
                <>
                  <li>
                    <span className={styles.userName}>{user?.fullName.split(' ')[0]}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login" className={pathname === '/login' ? styles.active : ''}>
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </AppContainer>
    </header>
  );
};

export default AppHeader;
