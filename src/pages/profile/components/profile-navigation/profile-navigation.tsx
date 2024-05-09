import React, {FC, useRef} from "react";
import {Link, NavLink} from "react-router-dom";

import styles from "./styles.module.css";

import Logout, {ILogoutRefAttrs} from "../../../../components/logout/logout.tsx";

const ProfileNavigation: FC = () => {
  const logoutRef = useRef<ILogoutRefAttrs>(null);
  const handleLogout = () => logoutRef.current?.handleLogout();

  return (
    <section className={styles.navigation_bar}>
      <p className={styles.link_container}>
        <NavLink to="/profile" end className={({ isActive }) => (
          `${styles.link} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
        )}>
          Профиль
        </NavLink>
      </p>
      <p className={styles.link_container}>
        <NavLink to="/profile/orders" className={({ isActive }) => (
          `${styles.link} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
        )}>
          История заказов
        </NavLink>
      </p>
      <p className={styles.link_container}>
        <Logout ref={logoutRef} />
        <Link to="#" className={`${styles.link} text text_type_main-medium text_color_inactive`} onClick={handleLogout}>
          Выход
        </Link>
      </p>
      <p className="mt-20 text text_type_main-small text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  )
}

export default ProfileNavigation;
