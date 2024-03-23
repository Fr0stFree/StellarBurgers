import { FC } from 'react';
import styles from './styles.module.css';

type NavItemProps = {
  text: string;
  children: React.ReactNode;
}

const NavLink: FC = ({ text, children }: NavItemProps) => {
  return (
    <a href="#" className={styles.link}>
      {children}
      <span className={styles.text}>{text}</span>
    </a>
  );
}

export default NavLink;
