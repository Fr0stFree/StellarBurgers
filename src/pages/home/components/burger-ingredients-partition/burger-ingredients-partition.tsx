import React, {FC} from "react";

import styles from './styles.module.css';

import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {type IIngredient} from "../../../../services/ingredients/types";

interface IBurgerIngredientsPartitionProps {
  title: string;
  ingredients: IIngredient[];
}

const BurgerIngredientsPartition: FC<IBurgerIngredientsPartitionProps> = ({ingredients, title}) => {
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
