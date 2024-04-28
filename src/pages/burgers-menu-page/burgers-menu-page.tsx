import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.tsx";
import React, {FC} from "react";

import styles from "./styles.module.css";

const BurgersMenuPage: FC = () => {
  return (
    <main className={styles.content}>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  )
}

export default BurgersMenuPage;
