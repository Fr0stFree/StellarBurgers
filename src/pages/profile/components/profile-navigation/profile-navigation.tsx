import React, {FC} from "react";
import {Link, NavLink} from "react-router-dom";

import styles from "./styles.module.css";

import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {logoutUser} from "../../../../services/auth/thunks.ts";
import Modal from "../../../../components/modal/modal.tsx";
import Tooltip from "../../../../components/tooltip/tooltip.tsx";
import {resetRequestStatus} from "../../../../services/auth/slices.ts";

const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutUser())
  const {logoutRequestStatus: requestStatus} = useAppSelector(state => state.auth);
  const handleCloseTooltip = () => dispatch(resetRequestStatus('logout'));

  let additionalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text="Пожалуйста, подождите" showLoading /></Modal>
      );
      break;
    case 'failed':
      additionalContent = (
        <Modal onClose={handleCloseTooltip}><Tooltip text='Не удалось выйти, попробуйте позже' /></Modal>
      );
      break;
    case 'succeeded':
      // No need to handle this case. A user will be redirected to login page as soon as login is successful
      break;
  }

  return (
    <section className={styles.navigation_bar}>
      {additionalContent}
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
