import React, { FC } from 'react';
import { CurrencyIcon, Button , DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { type IIngredient } from "../../services/ingredients";
import styles from './styles.module.css';

type BurgerConstructorProps = {
  mains: IIngredient[];
  onIngredientClick: (ingredient: IIngredient) => void;
  onPlaceOrderClick: () => void;
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({ mains, onIngredientClick, onPlaceOrderClick }) => {
  return (
    <section className="mt-25 mr-4 ml-4">
      <ul className={`${styles.list} mb-10`}>
        {mains.map((main, index, mains ) => {
          const { price, name, image } = main;
          const isTop = index === 0;
          const isBottom = index === mains.length - 1;
          return (
            <li key={main._id} className={styles.item}>
              <div className={styles.constructor_element_drag}><DragIcon type="primary" /></div>
              <div className={styles.constructor_element_wrapper} onClick={() => onIngredientClick(main)}>
                <ConstructorElement price={price}
                                    text={name}
                                    thumbnail={image}
                                    isLocked={false}
                                    type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className={styles.order}>
        <div className="mr-10">
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" htmlType="button" onClick={onPlaceOrderClick}>Оформить заказ</Button>
      </p>
    </section>
  );
}

export default BurgerConstructor;
