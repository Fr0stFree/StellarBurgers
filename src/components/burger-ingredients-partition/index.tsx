import React, { FC } from "react";

import BurgerIngredient from "../burger-ingredient";
import { type IIngredient } from "../../services/ingredients";
import styles from './styles.module.css';

type BurgerIngredientsPartitionProps = {
  title: string;
  ingredients: IIngredient[];
}

const BurgerIngredientsPartition: FC<BurgerIngredientsPartitionProps> = ({ ingredients, title }) => {
  return (
    <section className="mb-10">
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={styles.ingredients_list}>
        {ingredients.map((ingredient) => <li key={ingredient._id}><BurgerIngredient ingredient={ingredient}/></li>)}
      </ul>
    </section>
  )
}

export default BurgerIngredientsPartition;
