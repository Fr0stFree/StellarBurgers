import React, {FC, useState} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css';
import {IIngredient} from "../../services/ingredients";
import Modal from "../modal";
import BurgerIngredientDetail from "../burger-ingredient-detail";

type BurgerIngredientProps = {
  ingredient: IIngredient;
};

const BurgerIngredient: FC<BurgerIngredientProps> = ({ ingredient }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className={styles.ingredient} onClick={handleClick}>
        <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
        <p className={`${styles.description} mb-1`}>
          <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-small mb-6">{ingredient.name}</p>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <BurgerIngredientDetail ingredient={ingredient} />
      </Modal>
  </>
  );
}

export default BurgerIngredient;
