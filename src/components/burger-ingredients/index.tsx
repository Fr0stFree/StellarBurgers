import React, {FC, useMemo} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import BurgerIngredientsPartition from "../burger-ingredients-partition";
import styles from './styles.module.css';
import { type IMemoizedIngredients } from "./types";
import { useAppSelector } from "../../hooks";

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = React.useState<Tab>('sauce')
  const ingredients = useAppSelector(state => state.ingredients.all);

  const { buns, sauces, mains } = useMemo<IMemoizedIngredients>(() => (
    ingredients.reduce((accumulator, ingredient) => {
      const mapping = {main: "mains", sauce: "sauces", bun: "buns"}
      accumulator[mapping[ingredient.type]].push(ingredient);
      return accumulator;
    }, { buns: [], sauces: [], mains: [] })
  ), [ingredients]);

  return (
    <article className="pt-10">
      <section className="mb-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <ul className={styles.ingredients_tab}>
          <li><Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>Булки</Tab></li>
          <li><Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>Соусы</Tab></li>
          <li><Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>Начинки</Tab></li>
        </ul>
      </section>
      <div className={styles.ingredients}>
        <BurgerIngredientsPartition title="Булки" ingredients={buns} />
        <BurgerIngredientsPartition title="Соусы" ingredients={sauces} />
        <BurgerIngredientsPartition title="Начинки" ingredients={mains} />
      </div>
    </article>
  );
}

export default BurgerIngredients;
