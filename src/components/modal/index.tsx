import React, {FC, useCallback, useEffect} from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../services/ingredients/slices";
import BurgerIngredientDetail from "./components/burger-ingredient-detail";
import OrderDetail from "./components/order-detail";

const modalRoot = document.getElementById('modal-root')!;

const Modal: FC = () => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);

  useEffect(() => {
    const closeModalByEscape = (event: KeyboardEvent) => event.key === 'Escape' && handleClose();
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  }, [dispatch, handleClose]);
  const { isOpen, contentType, previewedIngredient, order } = useAppSelector(state => ({
    isOpen: state.ingredients.modal.isOpen,
    contentType: state.ingredients.modal.contentType,
    previewedIngredient: state.ingredients.previewed,
    order: state.ingredients.order,
  }));

  if (!isOpen) return null;

  let innerComponent: React.ReactNode;
  switch (contentType) {
    case 'ingredient':
      innerComponent = <BurgerIngredientDetail ingredient={previewedIngredient!} />;
      break;
    case 'order':
      innerComponent = <OrderDetail order={order!} />;
      break;
    default:
      innerComponent = null;
  }

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
