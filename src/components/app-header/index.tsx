import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';

import styles from './styles.module.css';
import NavLink from "../nav-item";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.header__nav_list}>
          <li className={styles.header__nav_item}>
            <NavLink text={"Конструктор"}><BurgerIcon type="primary"/></NavLink>
          </li>
          <li className={styles.header__nav_item}>
            <NavLink text={"Лента заказов"}><ListIcon type="secondary"/></NavLink>
          </li>
          <li className={styles.header__logo}>
            <Logo/>
          </li>
          <li className={styles.header__nav_item}>
            <NavLink text={"Профиль"}><ProfileIcon type="secondary"/></NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
