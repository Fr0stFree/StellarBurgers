import React, {FC, useMemo} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

import styles from './styles.module.css';

import {type IIngredient} from "../../../../services/ingredients/types.ts";
import {useAppLocation, useAppSelector} from "../../../../hooks.ts";
import {DraggableType} from "../../../../services/ingredients/const.ts";

interface IBurgerIngredientProps {
  ingredient: IIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ingredient}) => {
  const location = useAppLocation();
  const { selected: ingredients } = useAppSelector(state => state.ingredients);
  const [_, dragRef] = useDrag(() => ({
    type: DraggableType.NEW_INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const selectedAmount = useMemo(() => (
    ingredients.reduce((acc, item) => item._id === ingredient._id ? acc + 1 : acc, 0)
  ), [ingredients])
  return (
    <motion.div className={styles.ingredient}
                ref={dragRef}
                whileHover={{opacity: 1, scale: 1.01}}
                transition={{duration: .2}}
    >
      {selectedAmount > 0 && <span className={`${styles.amount} text text_type_digits-small`}>{selectedAmount}</span>}
      <Link to={`/ingredients/${ingredient._id}`} state={{background: location}}>
        <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
      </Link>
      <p className={`${styles.description} mb-1`}>
        <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </p>
      <p className="text text_type_main-small mb-6">{ingredient.name}</p>
    </motion.div>
  );
}

export default BurgerIngredient;
