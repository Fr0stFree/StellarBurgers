import { FC } from "react";

import { type IIngredient } from "../../../../services/ingredients/types";
import styles from "./styles.module.css";

type BurgerIngredientDetailProps = {
  ingredient: IIngredient;
}

const BurgerIngredientDetail: FC<BurgerIngredientDetailProps> = ({ ingredient }) => {
  return (
    <section className={`${styles.container} pt-10 pb-15`}>
      <h1 className={`${styles.title} text text_type_main-large ml-10`}>Детали ингредиента</h1>
      <figure className={`${styles.figure} mb-8`}>
        <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
        <figcaption className="text text_type_main-medium">{ingredient.name}</figcaption>
      </figure>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <span className="text text_type_main-default text_color_inactive">Калории,ккал </span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
        </li>
        <li className={styles.list_item}>
          <span className="text text_type_main-default text_color_inactive">Белки,г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
        </li>
        <li className={styles.list_item}>
          <span className="text text_type_main-default text_color_inactive">Жиры,г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
        </li>
        <li className={styles.list_item}>
          <span className="text text_type_main-default text_color_inactive">Углеводы,г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredientDetail;