import React, {FC} from "react";

import styles from "./styles.module.css";

import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

const HomePage: FC = () => {
  return (
    <main className={styles.content}>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  )
}

export default HomePage;
