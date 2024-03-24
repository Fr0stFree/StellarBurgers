import React, { FC } from 'react';
import { CurrencyIcon, Button , DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { type Ingredient } from "../../services/ingredients";
import styles from './styles.module.css';

type BurgerConstructorProps = {
  mains: Ingredient[];
}

const BurgerConstructor: FC = ({ mains }: BurgerConstructorProps) => {
  return (
    <section className="mt-25 mr-4 ml-4">
      <ul className={`${styles.list} mb-10`}>
        {mains.map((main, index, mains ) => {
          const { price, name, image } = main;
          const isTop = index === 0;
          const isBottom = index === mains.length - 1;
          const isLocked = isTop || isBottom;
          return (
            <li key={main._id} className={styles.item}>
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
    </section>
  );
}

export default BurgerConstructor;
