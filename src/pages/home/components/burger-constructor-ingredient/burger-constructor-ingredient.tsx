import React, {FC} from "react"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Reorder, useDragControls} from "framer-motion";

import styles from "./styles.module.css";

import {type ISelectedIngredient} from "../../../../services/ingredients/types.ts";
import {removeIngredient} from "../../../../services/ingredients/slices.ts";
import {useAppDispatch} from "../../../../hooks.ts";
import {IngredientType} from "../../../../services/ingredients/const.ts";

interface IConstructorIngredientProps {
  ingredient: ISelectedIngredient;
  position?: 'bottom' | 'top';
  index: number;
  onReorderEnd?: () => void;
}

const BurgerConstructorIngredient: FC<IConstructorIngredientProps> = ({ingredient, position, index, onReorderEnd}) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = () => dispatch(removeIngredient(index));
  const controls = useDragControls();

  return (
    <Reorder.Item className={styles.item}
                  value={ingredient}
                  dragListener={false}
                  dragControls={controls}
                  onDragTransitionEnd={onReorderEnd}
                  initial={{opacity: 0}}
                  animate={{opacity: 1, transition: {duration: .4}}}
    >
      <div onPointerDown={(event) => controls.start(event)}
           style={{visibility: ingredient.type === IngredientType.BUN ? 'hidden' : 'visible', cursor: 'grab'}}
      >
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement price={ingredient.price}
                          text={position === 'top' ? `${ingredient.name} (верх)`
                                                   : position === 'bottom' ? `${ingredient.name} (низ)`
                                                   : ingredient.name}
                          thumbnail={ingredient.image}
                          type={position}
                          isLocked={ingredient.type === IngredientType.BUN}
                          handleClose={handleRemoveIngredient}
      />
    </Reorder.Item>
  )
}

export default BurgerConstructorIngredient;
