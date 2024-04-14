import React, {FC, useRef} from "react"
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./styles.module.css";
import {type IIngredient} from "../../../../services/ingredients/types.ts";
import {moveIngredient, removeIngredient} from "../../../../services/ingredients/slices.ts";
import {useAppDispatch} from "../../../../hooks";
import {DraggableType, IngredientType} from "../../../../services/constants";

type ConstructorIngredientProps = {
  ingredient: IIngredient;
  position?: 'bottom' | 'top';
  index: number;
}

const ConstructorIngredient: FC<ConstructorIngredientProps> = ({ingredient, position, index}) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = () => dispatch(removeIngredient(index));
  const ref = useRef<HTMLDivElement>(null)

  const [_, drop] = useDrop({
    accept: DraggableType.SELECTED_INGREDIENT,
    hover(dragItem: { index: number, type: IngredientType }, monitor) {
      if (!ref.current) return;
      if (dragItem.index === index) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (ingredient.type === IngredientType.BUN) return;
      if (dragItem.index < index && hoverClientY < hoverMiddleY) return;
      if (dragItem.index > index && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({dragIndex: dragItem.index, hoverIndex: index}));
      dragItem.index = index;
    },
  })
  const [{isDragging}, drag] = useDrag({
    type: DraggableType.SELECTED_INGREDIENT,
    item: {type: ingredient.type, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div className={styles.item} ref={ingredient.type !== IngredientType.BUN ? ref : undefined}
         style={{opacity: isDragging ? 0 : 1}}>
      {ingredient.type === IngredientType.BUN ? <div className="ml-6"></div>
        : <div className={styles.drag_icon}><DragIcon type="primary"/></div>}
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
