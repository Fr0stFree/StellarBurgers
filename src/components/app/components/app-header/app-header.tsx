import React, {FC} from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';

import HeaderLink from "../header-link/header-link.tsx";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.nav_list} mt-4 mb-4`}>
          <li className="mr-5 ml-5">
            <HeaderLink to="/" text="Конструктор" icon={BurgerIcon} />
          </li>
          <li className="mr-5 ml-5">
            <HeaderLink to="/orders" text="Лента заказов" icon={ListIcon} />
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.nav_item_pushed} mr-5`}>
            <HeaderLink to="/profile" text="Профиль" icon={ProfileIcon} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
