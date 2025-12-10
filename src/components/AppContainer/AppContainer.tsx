import { PropsWithChildren } from 'react';
import styles from './AppContainer.module.scss';

const AppContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.AppContainer}>{children}</div>;
};

export default AppContainer;
