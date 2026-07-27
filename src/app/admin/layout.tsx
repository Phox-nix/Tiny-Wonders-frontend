'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import styles from './admin.module.scss';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && (!isAuthenticated || !isAdmin)) {
      router.push('/');
    }
  }, [hydrated, isAuthenticated, isAdmin, router]);

  if (!hydrated || !isAuthenticated || !isAdmin) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/admin" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/articles" className={styles.navLink}>
                Articles
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className={styles.navLink}>
                Categories
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
