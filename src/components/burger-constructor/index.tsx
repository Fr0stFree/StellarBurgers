import React, {FC, ReactNode, useState} from 'react';
import { CurrencyIcon, Button , DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { type IIngredient } from "../../services/ingredients";
import styles from './styles.module.css';
import Modal from "../modal";
import BurgerIngredientDetail from "../burger-ingredient-detail";
import OrderDetail from "../order-detail";

type BurgerConstructorProps = {
  ingredients: IIngredient[];
}

type IModalState = {
  isOpen: boolean;
  children: ReactNode
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({ ingredients }) => {
  const [modalState, setModalState] = useState<IModalState>({ isOpen: false, children: null });
  const handleIngredientClick = (ingredient: IIngredient) => (
    setModalState({ isOpen: true, children: <BurgerIngredientDetail ingredient={ingredient} /> })
  );
  const handlePlaceOrderClick = () => (
    setModalState({ isOpen: true, children: <OrderDetail orderId={Math.floor(Math.random() * 1000000)} /> })
  );
  const handleClose = () => setModalState({ isOpen: false, children: null });

  return (
    <>
      <section className="mt-25 mr-4 ml-4">
        <ul className={`${styles.list} mb-10`}>
          {ingredients.map((ingredient, index, mains ) => {
            const { price, name, image } = ingredient;
            const isTop = index === 0;
            const isBottom = index === mains.length - 1;
            return (
              <li key={ingredient._id} className={styles.item}>
                <div className={styles.constructor_element_drag}><DragIcon type="primary" /></div>
                <div className={styles.constructor_element_wrapper} onClick={() => handleIngredientClick(ingredient)}>
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
          <Button type="primary" size="medium" htmlType="button" onClick={handlePlaceOrderClick}>Оформить заказ</Button>
        </p>
      </section>
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        {modalState.children}
      </Modal>
    </>
  );
}

export default BurgerConstructor;
