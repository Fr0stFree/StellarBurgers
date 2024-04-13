import React, {FC, useMemo} from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from "react-dnd";

import {type IIngredient} from "../../services/ingredients/types.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addBuns, addIngredient} from "../../services/ingredients/slices.ts";
import {hideOrder, makeOrder} from "../../services/orders/slices";
import {DraggableType, IngredientType} from "../../services/constants";
import ConstructorIngredient from "./components/constuctor-element/constructor-element.tsx";
import Modal from "../modal/modal.tsx";
import OrderDetails from "../order-details/order-details.tsx";
import styles from './styles.module.css';
import Tooltip from "../tooltip/tooltip.tsx";

const hoveredStyles = {
  boxShadow: '0 0 15px 5px #8585AD',
  borderRadius: '18px',
  transition: 'box-shadow .4s',
}

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const {ingredients, order, requestStatus} = useAppSelector(state => ({
    ingredients: state.ingredients.selected,
    order: state.orders.order,
    requestStatus: state.orders.makeOrderRequestStatus,
  }));
  const [{isNewIngredientHovered}, newIngredientDropzone] = useDrop(() => ({
    accept: DraggableType.NEW_INGREDIENT,
    drop: (item: IIngredient) => item.type === IngredientType.BUN ? dispatch(addBuns(item)) : dispatch(addIngredient(item)),
    collect: (monitor) => ({
      isNewIngredientHovered: monitor.isOver(),
    }),
  }));

  const handlePlaceOrderClick = () => dispatch(makeOrder(ingredients.map(ingredient => ingredient._id)));
  const handleCloseOrderModal = () => dispatch(hideOrder());
  const handleCloseTooltip = () => dispatch(hideOrder());

  const orderPrice = useMemo(() => ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0), [ingredients]);
  const isOrderValid = useMemo(() => ingredients.some(ingredient => ingredient.type === IngredientType.BUN), [ingredients]);

  return (
    <>
      <section className={`${styles.content} mt-25 mr-4 ml-4`}
               ref={newIngredientDropzone}
               style={isNewIngredientHovered ? hoveredStyles : {}}
      >
        <ul className={`${styles.list} mb-10`}>
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.uuid} className={styles.item}>
              <ConstructorIngredient ingredient={ingredient}
                                     index={index}
                                     position={index === 0 ? 'top' : index === ingredients.length - 1 ? 'bottom' : undefined}
              />
            </li>
          ))}
        </ul>
        <div className={styles.order}>
          <p className="mr-10">
            <span className="text text_type_digits-medium">{orderPrice}</span>
            <CurrencyIcon type="primary"/>
          </p>
          <Button type="primary"
                  size="medium"
                  htmlType="button"
                  disabled={!isOrderValid}
                  onClick={handlePlaceOrderClick}
          >Оформить заказ
          </Button>
        </div>
      </section>
      {requestStatus === 'pending' && <Tooltip onClose={handleCloseTooltip} showLoading text="Отправка заказа"/>}
      {requestStatus === 'failed' && <Tooltip onClose={handleCloseTooltip} text="Ошибка отправки заказа"/>}
      {requestStatus === 'succeeded' && <Modal onClose={handleCloseOrderModal}><OrderDetails order={order!}/></Modal>}
    </>
  );
}

export default BurgerConstructor;
