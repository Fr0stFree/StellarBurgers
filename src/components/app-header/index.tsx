import React, { FC } from 'react';
import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';
import NavLink from "../nav-link";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav style={{maxWidth: 1240, margin: "auto"}}>
        <ul style={{display: "flex", listStyle: "none"}} className="mt-4 mb-4">
          <li className="mr-5 ml-5">
            <NavLink text={"Конструктор"}><BurgerIcon type="primary"/></NavLink>
          </li>
          <li className="mr-5 ml-5">
            <NavLink text={"Лента заказов"}><ListIcon type="secondary"/></NavLink>
          </li>
          <li className={styles.header__logo}>
            <Logo/>
          </li>
          <li className="mr-5" style={{marginLeft: "auto"}}>
            <NavLink text={"Профиль"}><ProfileIcon type="secondary"/></NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
