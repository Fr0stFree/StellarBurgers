import React, { FC, useEffect, useState } from 'react';

import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import AppFooter from '../app-footer';
import styles from './styles.module.css';
import {type Ingredient, loadIngredients} from "../../services/ingredients";

const App: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect<() => void>(() => {
    setIngredients(loadIngredients());
  }, []);

  return (
    <div className={`${styles.content} mt-10 mr-10 ml-10`}>
      <AppHeader />
      <main style={{display: "flex", columnGap: 40, maxWidth: 1240}}>
        <BurgerIngredients
          buns={ingredients.filter((ingredient) => ingredient.type === 'bun')}
          sauces={ingredients.filter((ingredient) => ingredient.type === 'sauce')}
        />
        <BurgerConstructor ingredients={ingredients.filter((ingredient) => ingredient.type === 'main')} />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
