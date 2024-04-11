import React, {FC, useMemo } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from "react-dnd";

import { type IIngredient } from "../../services/ingredients/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addIngredient } from "../../services/ingredients/slices";
import { DraggableType } from "../../services/constants";
import { thunkMakeOrder } from "../../services/ingredients/thunks";
import styles from './styles.module.css';
import ConstructorIngredient from "./components/constuctor-element";

const hoveredStyles = {
  boxShadow: '0 0 15px 5px #8585AD',
  borderRadius: '18px',
  transition: 'box-shadow .4s',
}

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(state => state.ingredients.selected);
  const [{ isNewIngredientHovered }, newIngredientDropzone] = useDrop(() => ({
    accept: DraggableType.NEW_INGREDIENT,
    drop: (item: IIngredient) => dispatch(addIngredient(item)),
    collect: (monitor) => ({
      isNewIngredientHovered: monitor.isOver(),
    }),
  }));

  const handlePlaceOrderClick = () => dispatch(thunkMakeOrder(ingredients.map(ingredient => ingredient._id)));

  const orderPrice = useMemo(() => ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0), [ingredients]);

  return (
    <>
      <section className="mt-25 mr-4 ml-4" ref={newIngredientDropzone} style={isNewIngredientHovered ? hoveredStyles : {}}>
        <ul className={`${styles.list} mb-10`}>
          {ingredients.map((ingredient) => (
            <li key={ingredient._id + ingredient.index} className={styles.item}>
              <ConstructorIngredient ingredient={ingredient}
                                     position={ingredient.index === 0 ? 'top' : ingredient.index === ingredients.length - 1 ? 'bottom' : undefined}
              />
            </li>
          ))}
        </ul>
        <p className={styles.order}>
          <div className="mr-10">
            <span className="text text_type_digits-medium">{orderPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" htmlType="button" onClick={handlePlaceOrderClick}>Оформить заказ</Button>
        </p>
      </section>
    </>
  );
}

export default BurgerConstructor;
