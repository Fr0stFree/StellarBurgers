import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { type Ingredient } from '../../services/ingredients';

import BurgerIngredient from "../burger-ingredient";
import styles from './styles.module.css';

type BurgerIngredientsProps = {
  buns: Ingredient[];
  sauces: Ingredient[];
};

const BurgerIngredients: FC = ({ buns, sauces }: BurgerIngredientsProps) => {
  const [currentTab, setCurrentTab] = React.useState<Tab>('sauce')

  return (
    <article className="pt-10">
      <section className="mb-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <ul style={{display: "flex", listStyle: "none"}}>
          <li><Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>Булки</Tab></li>
          <li><Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>Соусы</Tab></li>
          <li><Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>Начинки</Tab></li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <ul className={styles.ingredients_list}>
          {buns.map((bun) => <li key={bun._id}><BurgerIngredient {...bun} /></li>)}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
        <ul className={styles.ingredients_list}>
          {sauces.map((sauce) => <li key={sauce._id}><BurgerIngredient {...sauce} /></li>)}
        </ul>
      </section>
    </article>
  );
}

export default BurgerIngredients;
