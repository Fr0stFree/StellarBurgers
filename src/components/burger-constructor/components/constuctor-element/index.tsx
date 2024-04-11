import React, {FC, useRef} from "react"
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import styles from "./styles.module.css";
import { type IIngredient, type ISelectedIngredient } from "../../../../services/ingredients/types";
import {moveIngredient, removeIngredient} from "../../../../services/ingredients/slices";
import { useAppDispatch } from "../../../../hooks";
import {DraggableType, IngredientType} from "../../../../services/constants";

type ConstructorIngredientProps = {
  type?: 'top' | 'bottom';
  ingredient: ISelectedIngredient;
}

const ConstructorIngredient: FC<ConstructorIngredientProps> = ({ingredient, type }) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = (ingredient: IIngredient) => dispatch(removeIngredient(ingredient));
  const ref = useRef<HTMLDivElement>(null)

  const [,drop] = useDrop({
    accept: DraggableType.SELECTED_INGREDIENT,
    hover(item: ISelectedIngredient, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = ingredient.index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      item.index = hoverIndex
      dispatch(moveIngredient({ dragIndex, hoverIndex }))
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: DraggableType.SELECTED_INGREDIENT,
    item: () => ({ ingredient, index: ingredient.index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div className={styles.item} ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      { type ? <div className="ml-6"></div> : <div className={styles.drag_icon} ><DragIcon type="primary" /></div>}
      <ConstructorElement price={ingredient.price}
                          text={ingredient.name}
                          thumbnail={ingredient.image}
                          type={type}
                          isLocked={ingredient.type === IngredientType.BUN}
                          handleClose={() => handleRemoveIngredient(ingredient)}
      />
    </div>
  )
}

export default ConstructorIngredient;
