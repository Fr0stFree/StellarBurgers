import React, {FC, useCallback, useMemo} from 'react';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDrop} from "react-dnd";
import {motion} from "framer-motion";

import {type IIngredient, ISelectedIngredient} from "../../services/ingredients/types.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addBuns, addIngredient, reorderIngredients} from "../../services/ingredients/slices.ts";
import {hideOrder} from "../../services/orders/slices";
import {DraggableType, IngredientType} from "../../services/constants";
import ConstructorIngredient from "./components/constuctor-element/constructor-element.tsx";
import Modal from "../modal/modal.tsx";
import OrderDetails from "../order-details/order-details.tsx";
import styles from './styles.module.css';
import Tooltip from "../tooltip/tooltip.tsx";
import {makeOrder} from "../../services/orders/thunks.ts";
import {AnimatePresence, Reorder} from "framer-motion";

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
  const handleReorder = (items: ISelectedIngredient[]) => dispatch(reorderIngredients(items));
  const handleInvalidOrder = useCallback((items: ISelectedIngredient[]) => {
    const buns = items.filter(ingredient => ingredient.type === IngredientType.BUN);
    if (!buns.length) return;
    if (items[0].type === IngredientType.BUN && items[1].type === IngredientType.BUN) return;
    const correctOrder = [buns[0], ...items.filter(ingredient => ingredient.type !== IngredientType.BUN), buns[1]];
    return dispatch(reorderIngredients(correctOrder));
  }, [dispatch]);

  let modalContent = null;
  switch (requestStatus) {
    case 'pending':
      modalContent = <Modal onClose={handleCloseTooltip}><Tooltip showLoading text="Отправка заказа"/></Modal>;
      break;
    case 'failed':
      modalContent = <Modal onClose={handleCloseTooltip}><Tooltip text="Ошибка отправки заказа"/></Modal>;
      break;
    case 'succeeded':
      modalContent = <Modal onClose={handleCloseOrderModal}><OrderDetails order={order!}/></Modal>;
      break;
    case 'idle':
      break
  }

  return (
    <>
      <motion.section className={`${styles.content} mt-25 mr-4 ml-4`}
                      ref={newIngredientDropzone}
                      style={{borderRadius: '25px'}}
                      animate={{boxShadow: isNewIngredientHovered ? '0 0 35px 5px #8585AD' : '0 0 0 0 rgba(0, 0, 0, 0)'}}
                      transition={{duration: 0.05}}
      >
        <Reorder.Group onReorder={handleReorder} values={ingredients} axis="y" className={`${styles.list} mb-10`}>
        {ingredients.map((ingredient, index) => (
          <ConstructorIngredient ingredient={ingredient}
                                 key={ingredient.uuid}
                                 index={index}
                                 onReorderEnd={() => handleInvalidOrder(ingredients)}
                                 position={index === 0 ? 'top' : index === ingredients.length - 1 ? 'bottom' : undefined}
          />
        ))}
        </Reorder.Group>
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
      </motion.section>
      <AnimatePresence>
        {modalContent}
      </AnimatePresence>
    </>
  );
}

export default BurgerConstructor;
