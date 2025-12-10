import AppContainer from '@/components/AppContainer/AppContainer';
import styles from '@/components/AppHeader/AppHeader.module.scss';
import Link from 'next/link';

const AppHeader = () => {
  return (
    <div className={styles.AppHeader}>
      <AppContainer>
        <div className={styles.AppHeader__Wrapper}>
          <div>
            <Link href="/">Logo</Link>
          </div>

          <nav>
            <ul>
              <li>
                <Link href="news">news</Link>
              </li>
            </ul>
          </nav>
        </div>
      </AppContainer>
    </div>
  );
};

export default AppHeader;
