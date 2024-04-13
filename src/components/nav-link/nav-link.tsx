import React, {ComponentPropsWithoutRef, FC, ReactNode} from 'react';

import styles from './styles.module.css';

type NavItemProps = {
  text: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>

const NavLink: FC<NavItemProps> = ({text, children, ...props}) => {
  return (
    <a className={styles.link} {...props}>
      {children}
      <span className="text text_type_main-small">{text}</span>
    </a>
  );
}

export default NavLink;
