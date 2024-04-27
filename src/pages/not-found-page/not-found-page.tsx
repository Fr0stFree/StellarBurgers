import React, {FC} from "react";
import {Link, useNavigate} from "react-router-dom";

import styles from './styles.module.css';


const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className="text text_type_digits-large">404</h1>
      <p className="text text_type_main-medium text_color_inactive mb-4">This is not the page you are looking for...</p>
      <Link onClick={() => navigate(-1)} className="text text_color_accent" to="#">
        <span className="text text_type_main-medium text_color_primary">Назад</span>
      </Link>
    </main>
  )
}

export default NotFoundPage;
