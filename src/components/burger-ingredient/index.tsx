import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';

type BurgerIngredientProps = {
  image: string;
  name: string;
  price: number;
};

const BurgerIngredient: FC = ({ image, name, price }: BurgerIngredientProps) => {
  return (
    <div className={styles.ingredient}>
      <img src={image} alt={name} className="mb-1" />
      <p className="mb-1" style={{display: "flex"}}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-small mb-6">{name}</p>
    </div>
  );

}

export default BurgerIngredient;