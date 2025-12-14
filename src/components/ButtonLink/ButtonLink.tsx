import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ButtonLink.module.scss';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const ButtonLink = ({ href, children, className }: ButtonLinkProps) => {
  return (
    <Link href={href} className={[styles.button, className].filter(Boolean).join(' ')}>
      {children}
    </Link>
  );
};

export default ButtonLink;
