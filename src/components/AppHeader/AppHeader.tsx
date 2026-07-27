'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import AppContainer from '@/components/AppContainer/AppContainer';
import ButtonLink from '../ButtonLink/ButtonLink';
import styles from '@/components/AppHeader/AppHeader.module.scss';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import { logout } from '@/services/authService';
import { getCategories } from '@/services/adminService';
import { Category } from '@/types/news';

const AppHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLanding = pathname === '/';
  const { isAuthenticated, isAdmin, user, logout: logoutStore } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <li ref={dropdownRef} className={styles.dropdownWrapper}>
                <button
                  className={`${styles.dropdownTrigger} ${pathname.startsWith('/news') ? styles.active : ''}`}
                  onClick={() => setShowDropdown((prev) => !prev)}>
                  Articles ▾
                </button>
                {showDropdown && (
                  <div className={styles.dropdown}>
                    <Link
                      href="/news"
                      className={styles.dropdownItem}
                      onClick={() => setShowDropdown(false)}>
                      All articles
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/news?category=${cat.slug}`}
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
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
              <li>
                <ButtonLink href="/about">About Us</ButtonLink>
              </li>
            </ul>
          </nav>
        </div>
      </AppContainer>
    </header>
  );
};

export default AppHeader;
