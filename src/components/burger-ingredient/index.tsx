import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';
import {IIngredient} from "../../services/ingredients";

type BurgerIngredientProps = {
  ingredient: IIngredient;
  onClick: (ingredient: IIngredient) => void;
};

const BurgerIngredient: FC<BurgerIngredientProps> = ({ ingredient , onClick }) => {

  const handleClick = () => onClick(ingredient);

  return (
    <div className={styles.ingredient} onClick={handleClick}>
      <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
      <p className={`${styles.description} mb-1`}>
        <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-small mb-6">{ingredient.name}</p>
    </div>
  );

}

export default BurgerIngredient;