import React, { FC, useEffect } from 'react';

import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import styles from './styles.module.css';
import { useAppDispatch } from "../../hooks";
import { thunkLoadIngredients } from "../../services/ingredients/thunks";
import Modal from "../modal";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect<() => void>(() => void dispatch(thunkLoadIngredients()), [dispatch]);

  return (
    <>
      <div className={`${styles.content} mt-10 mr-10 ml-10`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
      <Modal />
    </>
  );
}

export default App;
