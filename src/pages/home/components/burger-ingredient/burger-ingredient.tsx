import React, {FC} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {motion} from "framer-motion";

import styles from './styles.module.css';

import {IIngredient} from "../../../../services/ingredients/types.ts";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../../../hooks.ts";
import {previewIngredient} from "../../../../services/ingredients/slices.ts";
import {DraggableType} from "../../../../services/ingredients/const.ts";
import {Link} from "react-router-dom";

type BurgerIngredientProps = {
  ingredient: IIngredient;
};

const BurgerIngredient: FC<BurgerIngredientProps> = ({ingredient}) => {
  const dispatch = useAppDispatch();
  const location = useAppLocation();

  const [_, dragRef] = useDrag(() => ({
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
      <motion.div className={styles.ingredient}
                  onClick={handleClick}
                  ref={dragRef}
                  whileHover={{opacity: 1, scale: 1.01}}
                  transition={{duration: .2}}
      >
        {amount > 0 && <span className={`${styles.amount} text text_type_digits-small`}>{amount}</span>}
        <Link to={`/ingredients/${ingredient._id}`} state={{background: location}}>
          <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
        </Link>
        <p className={`${styles.description} mb-1`}>
          <span className="text text_type_digits-default mr-1">{ingredient.price}</span>
          <CurrencyIcon type="primary"/>
        </p>
        <p className="text text_type_main-small mb-6">{ingredient.name}</p>
      </motion.div>
    </>
  );
}

export default BurgerIngredient;
