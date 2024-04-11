import React, { FC, useRef } from "react"
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";
import { type ISelectedIngredient } from "../../../../services/ingredients/types";
import { moveIngredient, removeIngredient } from "../../../../services/ingredients/slices";
import { useAppDispatch } from "../../../../hooks";
import { DraggableType, IngredientType } from "../../../../services/constants";

type ConstructorIngredientProps = {
  ingredient: ISelectedIngredient;
  position?: 'bottom' | 'top';
}

const ConstructorIngredient: FC<ConstructorIngredientProps> = ({ingredient, position}) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = (ingredient: ISelectedIngredient) => dispatch(removeIngredient(ingredient));
  const ref = useRef<HTMLDivElement>(null)

  const [,drop] = useDrop({
    accept: DraggableType.SELECTED_INGREDIENT,
    hover(dragItem: {index: number, type: IngredientType}, monitor) {
      if (!ref.current) return;
      if (dragItem.index === ingredient.index) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (ingredient.type === IngredientType.BUN) return;
      if (dragItem.index < ingredient.index && hoverClientY < hoverMiddleY) return;
      if (dragItem.index > ingredient.index && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ dragIndex: dragItem.index, hoverIndex: ingredient.index }));
      dragItem.index = ingredient.index;
    },
  })
  const [, drag] = useDrag({
    type: DraggableType.SELECTED_INGREDIENT,
    item: { type: ingredient.type, index: ingredient.index },
  })

  drag(drop(ref))

  return (
    <div className={styles.item} ref={ingredient.type !== IngredientType.BUN ? ref : undefined}>
      { ingredient.type === IngredientType.BUN ? <div className="ml-6"></div> : <div className={styles.drag_icon} ><DragIcon type="primary" /></div>}
      <ConstructorElement price={ingredient.price}
                          text={ingredient.name}
                          thumbnail={ingredient.image}
                          type={position}
                          isLocked={ingredient.type === IngredientType.BUN}
                          handleClose={() => handleRemoveIngredient(ingredient)}
      />
    </div>
  )
}

export default ConstructorIngredient;
