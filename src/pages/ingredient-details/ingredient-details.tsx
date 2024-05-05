import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

import styles from "./styles.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {getIngredients} from "../../services/ingredients/thunks.ts";
import {NotFoundPage} from "../index.ts";

const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { all: ingredients, getIngredientsRequestStatus: requestStatus } = useAppSelector(state => state.ingredients);
  useEffect(() => {
    !ingredients.length && dispatch(getIngredients());
  }, [dispatch, ingredients]);

  let content = null;
  switch (requestStatus) {
    case 'idle' || 'failed':
      content = <NotFoundPage />;
      break;
    case 'pending':
      content = <div className={styles.loader}><TailSpin color="#4169E1" height={150} width={150}/></div>;
      break;
    case 'succeeded':
      const ingredient = ingredients.find(ingredient => ingredient._id === id);
      if (!ingredient) {
        content = <NotFoundPage />;
      } else {
        content = <IngredientDetails ingredient={ingredient} />;
      }
      break;
  }
  return (
    <main className={styles.content}>
      {content}
    </main>
  )
}

export default IngredientDetailsPage;
