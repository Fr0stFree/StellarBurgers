import React, {ComponentPropsWithoutRef, FC, ReactNode} from 'react';
import {motion} from "framer-motion";

import styles from './styles.module.css';

type NavItemProps = {
  text: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>

const NavLink: FC<NavItemProps> = ({text, children, ...props}) => {
  return (
    <motion.a className={styles.link} {...props} transition={{duration: 0.4}} whileHover={{opacity: .7}}>
      {children}
      <span className="text text_type_main-small">{text}</span>
    </motion.a>
  );
}

export default NavLink;
