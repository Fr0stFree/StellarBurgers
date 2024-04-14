import React, {FC} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";

import {IIngredient} from "../../../../services/ingredients/types.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {previewIngredient} from "../../../../services/ingredients/slices.ts";
import {DraggableType} from "../../../../services/constants";
import styles from './styles.module.css';

type BurgerIngredientProps = {
  ingredient: IIngredient;
};

const draggingStyles = {
  boxShadow: '0 0 15px -3px #8585AD',
  borderRadius: '18px',
  transition: 'box-shadow .4s',
}

const BurgerIngredient: FC<BurgerIngredientProps> = ({ingredient}) => {
  const dispatch = useAppDispatch();
  const [{isDragging}, dragRef] = useDrag(() => ({
    type: DraggableType.NEW_INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => dispatch(previewIngredient(ingredient));

  const amount = useAppSelector(state => state.ingredients.selected.reduce((acc, item) => item._id === ingredient._id ? acc + 1 : acc, 0));
  return (
    <>
      <div className={styles.ingredient} onClick={handleClick} ref={dragRef} style={isDragging ? draggingStyles : {}}>
        {amount ? <span className={`${styles.amount} text text_type_digits-small`}>{amount}</span> : null}
        <img src={ingredient.image} alt={ingredient.name} className="mb-1"/>
        <p className={`${styles.description} mb-1`}>
          <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
          <CurrencyIcon type="primary"/>
        </p>
        <p className="text text_type_main-small mb-6">{ingredient.name}</p>
      </div>
    </>
  );
}

export default BurgerIngredient;
