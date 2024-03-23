import { FC } from 'react';
import { type Ingredient } from '../../services/ingredients';

import BurgerIngredient from "../burger-ingredient";
import styles from './styles.module.css';

type BurgerIngredientsProps = {
  buns: Ingredient[];
  sauces: Ingredient[];
};

const BurgerIngredients: FC = ({ buns, sauces }: BurgerIngredientsProps) => {
  return (
    <article className={styles.article}>
      <section className={styles.section}>
        <h1 className={styles.menu_title}>Соберите бургер</h1>
        <ul className={styles.menu_list}>
          <li className={`${styles.item} ${styles.item_active}`}>Булки</li>
          <li className={styles.item}>Начинки</li>
          <li className={styles.item}>Соусы</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Булки</h2>
        <ul className={styles.ingredients_list}>
          {buns.map((bun) => <li className={styles.ingredients_item} key={bun._id}><BurgerIngredient {...bun} /></li>)}
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Соусы</h2>
        <ul className={styles.ingredients_list}>
          {sauces.map((sauce) => <li className={styles.ingredients_item} key={sauce._id}><BurgerIngredient {...sauce} />
          </li>)}
        </ul>
      </section>
    </article>
  );
}

export default BurgerIngredients;
