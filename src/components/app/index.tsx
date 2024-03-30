import React, {FC, useEffect, useMemo, useState} from 'react';

import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import styles from './styles.module.css';
import {type Ingredient, loadIngredients} from "../../services/ingredients";

const App: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect<() => void>(() => {
    const load = async () => {
      try {
        const ingredients = await loadIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  const buns = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients]);

  return (
    <div className={`${styles.content} mt-10 mr-10 ml-10`}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients buns={buns} sauces={sauces} mains={mains} />
        <BurgerConstructor mains={mains} />
      </main>
    </div>
  );
}

export default App;
