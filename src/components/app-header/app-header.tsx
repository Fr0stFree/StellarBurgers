import React, {FC} from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';
import NavLink from "../nav-link/nav-link.tsx";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.nav_list} mt-4 mb-4`}>
          <li className="mr-5 ml-5">
            <NavLink text={"Конструктор"}><BurgerIcon type="primary"/></NavLink>
          </li>
          <li className="mr-5 ml-5">
            <NavLink text={"Лента заказов"}><ListIcon type="secondary"/></NavLink>
          </li>
          <li className={styles.logo}>
            <Logo/>
          </li>
          <li className={`${styles.nav_item_pushed} mr-5`}>
            <NavLink text={"Профиль"}><ProfileIcon type="secondary"/></NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
