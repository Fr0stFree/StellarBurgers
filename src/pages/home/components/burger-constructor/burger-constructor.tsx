import React, {FC, useCallback, useMemo, useState} from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from "react-dnd";
import {AnimatePresence, motion, Reorder} from "framer-motion";
import {Tooltip as Popup} from 'react-tooltip'
import {useNavigate} from "react-router-dom";

import styles from './styles.module.css';

import {type IIngredient, type ISelectedIngredient} from "../../../../services/ingredients/types.ts";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../../../hooks.ts";
import {addBuns, addIngredient, reorderIngredients} from "../../../../services/ingredients/slices.ts";
import {hideOrder} from "../../../../services/orders/slices.ts";
import {DraggableType, IngredientType} from "../../../../services/ingredients/const.ts";
import ConstructorIngredient from "../constuctor-element/constructor-element.tsx";
import Modal from "../../../../components/modal/modal.tsx";
import OrderDetails from "../../../../components/order-details/order-details.tsx";
import Tooltip from "../../../../components/tooltip/tooltip.tsx";
import {makeOrderThunk} from "../../../../services/orders/thunks.ts";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const location = useAppLocation();
  const navigate = useNavigate();
  const [orderError, setOrderError] = useState<string | null>(null);
  const {ingredients, order, requestStatus, isAuthenticated} = useAppSelector(state => ({
    ingredients: state.ingredients.selected,
    order: state.orders.order,
    requestStatus: state.orders.makeOrderRequestStatus,
    isAuthenticated: !!state.auth.user,
  }));
  const [{isNewIngredientHovered}, newIngredientDropzone] = useDrop(() => ({
    accept: DraggableType.NEW_INGREDIENT,
    drop: (item: IIngredient) => item.type === IngredientType.BUN ? dispatch(addBuns(item)) : dispatch(addIngredient(item)),
    collect: (monitor) => ({
      isNewIngredientHovered: monitor.isOver(),
    }),
  }));

  const handlePlaceOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login', {state: {from: location.pathname}});
    }
    dispatch(makeOrderThunk(ingredients.map(ingredient => ingredient._id)));
  }
  const handleCloseOrderModal = () => dispatch(hideOrder());
  const handleCloseTooltip = () => dispatch(hideOrder());
  const handleIngredientsReorder = (items: ISelectedIngredient[]) => dispatch(reorderIngredients(items));
  const handleInvalidIngredientsOrder = useCallback((items: ISelectedIngredient[]) => {
    const [isCorrect, correctOrder] = isIngredientsOrderCorrect(items);
    !isCorrect && dispatch(reorderIngredients(correctOrder));
  }, [dispatch]);

  useMemo(() => {
    if (!ingredients.some(ingredient => ingredient.type === IngredientType.BUN)) {
      return setOrderError('Вы не можете оформить заказ без булки');
    }
    return setOrderError(null);
  }, [ingredients]);

  const totalPrice = useMemo(() => (
    ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0)
  ), [ingredients]);

  let modalContent;
  switch (requestStatus) {
    case 'idle':
      break;
    case 'pending':
      modalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip showLoading text="Отправка заказа"/>
        </Modal>
      );
      break;
    case 'failed':
      modalContent = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Ошибка отправки заказа"/>
        </Modal>
      );
      break;
    case 'succeeded':
      modalContent = (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails order={order!}/>
        </Modal>
      );
      break;
  }
  return (
    <>
      <motion.section className={`${styles.burger_constructor} pt-25 mr-4 ml-4`}
                      ref={newIngredientDropzone}
                      transition={{duration: 0.05}}
                      animate={{boxShadow: isNewIngredientHovered ? '0 0 35px 5px var(--background-light)'
                                                                  : '0 0 0 0 rgba(0, 0, 0, 0)'}}
      >
        <Reorder.Group onReorder={handleIngredientsReorder}
                       values={ingredients}
                       axis="y"
                       className={`${styles.ingredients_list} mb-10`}
        >
        {ingredients.map((ingredient, index) => (
          <ConstructorIngredient ingredient={ingredient}
                                 key={ingredient.uuid}
                                 index={index}
                                 onReorderEnd={() => handleInvalidIngredientsOrder(ingredients)}
                                 position={index === 0 ? 'top' : index === ingredients.length - 1 ? 'bottom' : undefined}
          />
        ))}
        </Reorder.Group>
        {!!ingredients.length &&
          <div className={styles.order}>
            <p className="mr-10">
              <span className="text text_type_digits-medium">{totalPrice}</span>
              <CurrencyIcon type="primary"/>
            </p>
            <div data-tooltip-id="order-error" data-tooltip-content={orderError} data-tooltip-place="top">
              <Button type="primary"
                      size="medium"
                      htmlType="button"
                      disabled={!!orderError}
                      onClick={handlePlaceOrderClick}
              >Оформить заказ
              </Button>
            </div>
          </div>
        }
      </motion.section>
      <AnimatePresence>
        {modalContent}
      </AnimatePresence>
      <Popup id="order-error" />
    </>
  );
}

export default BurgerConstructor;

function isIngredientsOrderCorrect(items: ISelectedIngredient[]): [boolean, ISelectedIngredient[]] {
  const buns = items.filter(ingredient => ingredient.type === IngredientType.BUN);
  if (!buns.length) {
    return [true, items]
  }
  if (items[0].type === IngredientType.BUN && items[items.length - 1].type === IngredientType.BUN) {
    return [true, items]
  }
  return [false, [buns[0], ...items.filter(ingredient => ingredient.type !== IngredientType.BUN), buns[1]]];
}
