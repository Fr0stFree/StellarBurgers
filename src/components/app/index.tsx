import React, { FC, useEffect, useMemo, useState } from 'react';

import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import styles from './styles.module.css';
import { type IIngredient, loadIngredients } from "../../services/ingredients";
import { type IMemoizedIngredients } from "./types";


const App: FC = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  useEffect<() => void>(() => {
    const load = async () => {
      try {
        setIngredients(await loadIngredients());
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const { buns, sauces, mains } = useMemo<IMemoizedIngredients>(() => (
    ingredients.reduce((accumulator, ingredient) => {
      const mapping = {main: "mains", sauce: "sauces", bun: "buns"}
      accumulator[mapping[ingredient.type]].push(ingredient);
      return accumulator;
    }, { buns: [], sauces: [], mains: [] })
  ), [ingredients]);

  return (
    <>
      <div className={`${styles.content} mt-10 mr-10 ml-10`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients buns={buns} sauces={sauces} mains={mains} />
          <BurgerConstructor ingredients={mains} />
        </main>
      </div>

    </>
  );
}

export default App;
