import React, {FC} from "react";
import {Outlet} from "react-router-dom";

import styles from "./styles.module.css";

import ProfileNavigation from "./components/profile-navigation/profile-navigation";

const ProfilePage: FC = () => {
  return (
    <main className={styles.content}>
      <ProfileNavigation />
      <Outlet />
    </main>
  )
}

export default ProfilePage;
