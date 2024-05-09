import React, {FC, useEffect} from "react";

import styles from "./styles.module.css";

import BurgerIngredients from "./components/burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "./components/burger-constructor/burger-constructor.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {getIngredientsThunk} from "../../services/ingredients/thunks.ts";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const {all: ingredients} = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    if (ingredients.length) return;
    const request = dispatch(getIngredientsThunk());
    return () => request.abort(); // TODO: why it does not work with React.strictMode?
  }, [dispatch, ingredients]);

  return (
    <main className={styles.content}>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  )
}

export default HomePage;
