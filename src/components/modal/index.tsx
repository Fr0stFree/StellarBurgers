import React, {FC, useEffect} from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../services/ingredients/slices";
import BurgerIngredientDetail from "../burger-ingredient-detail";
import OrderDetail from "../order-detail";


const modalRoot: HTMLElement = document.getElementById('modal-root');


const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => void dispatch(closeModal());
  useEffect(() => {
    const closeModalByEscape = (event: KeyboardEvent) => event.key === 'Escape' && handleClose();
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  }, [dispatch]);
  const { previewedIngredient, order } = useAppSelector(state => ({
    previewedIngredient: state.ingredients.previewed,
    order: state.ingredients.order,
  }));

  let innerComponent = null;
  if (previewedIngredient) {
    innerComponent = <BurgerIngredientDetail ingredient={previewedIngredient} />;
  }
  if (order) {
    innerComponent = <OrderDetail orderId={Math.floor(Math.random() * 1000000)} />;
  }

  if (!innerComponent) return null;
  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close_button} onClick={handleClose}>
          <CloseIcon type="primary" />
        </button>
        {innerComponent}
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
