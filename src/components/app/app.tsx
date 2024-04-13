import React, {FC, useEffect} from 'react';

import AppHeader from '../app-header/app-header.tsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.tsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.tsx';
import styles from './styles.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getIngredients, stopIngredientsLoading} from "../../services/ingredients/slices";
import Tooltip from "../tooltip/tooltip.tsx";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => void dispatch(getIngredients()), [dispatch]);

  const handleCloseTooltip = () => dispatch(stopIngredientsLoading());

  const requestStatus = useAppSelector(state => state.ingredients.getIngredientsRequestStatus);

  return (
    <>
      <div className={`${styles.content} mt-10 mr-10 ml-10`}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </div>
      {requestStatus === 'pending' && <Tooltip text="Загрузка ингредиентов" onClose={handleCloseTooltip} showLoading/>}
      {requestStatus === 'failed' && <Tooltip text="Ошибка загрузки ингредиентов" onClose={handleCloseTooltip}/>}
    </>
  );
}

export default App;
