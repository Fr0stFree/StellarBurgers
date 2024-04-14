import React, {FC} from "react"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";
import {type IIngredient} from "../../../../services/ingredients/types.ts";
import {removeIngredient} from "../../../../services/ingredients/slices.ts";
import {useAppDispatch} from "../../../../hooks";
import {IngredientType} from "../../../../services/constants";

type ConstructorIngredientProps = {
  ingredient: IIngredient;
  position?: 'bottom' | 'top';
  index: number;
}

const ConstructorIngredient: FC<ConstructorIngredientProps> = ({ingredient, position, index}) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = () => dispatch(removeIngredient(index));

  return (
    <div className={styles.item}>
      <div className={styles.drag_icon} style={{visibility: ingredient.type === IngredientType.BUN ? 'hidden' : 'visible'}}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement price={ingredient.price}
                          text={position === 'top' ? `${ingredient.name} (верх)` : position === 'bottom' ? `${ingredient.name} (низ)` : ingredient.name}
                          thumbnail={ingredient.image}
                          type={position}
                          isLocked={ingredient.type === IngredientType.BUN}
                          handleClose={handleRemoveIngredient}
      />
    </div>
  )
}

export default ConstructorIngredient;
