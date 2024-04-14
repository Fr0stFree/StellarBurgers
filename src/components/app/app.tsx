import React, {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header.tsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.tsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.tsx';
import styles from './styles.module.css';
import {useAppDispatch} from "../../hooks";
import {getIngredients} from "../../services/ingredients/thunks.ts";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <div className={`${styles.content} mt-10 mr-10 ml-10`}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </div>
    </>
  );
}

export default App;
