import React, { FC } from 'react';
import { CurrencyIcon, Button , DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { type Ingredient } from "../../services/ingredients";
import styles from './styles.module.css';

type BurgerConstructorProps = {
  ingredients: Ingredient[];
}

const BurgerConstructor: FC = ({ ingredients }: BurgerConstructorProps) => {
  return (
    <article className="mt-25 mr-4 ml-4">
      <ul className={`${styles.list} mb-10`}>
        {ingredients.map((ingredient, index, ingredients ) => {
          const { price, name, image } = ingredient;
          const isTop = index === 0;
          const isBottom = index === ingredients.length - 1;
          const isLocked = isTop || isBottom;
          return (
            <li key={ingredient._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement price={price} text={name} thumbnail={image} isLocked={isLocked} type={isTop ? 'top' : isBottom ? 'bottom' : undefined} />
            </li>
          );
        })}
      </ul>
      <p className={styles.order}>
        <div className="mr-10">
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" htmlType="button">Оформить заказ</Button>
      </p>
    </article>
  );
}

export default BurgerConstructor;
