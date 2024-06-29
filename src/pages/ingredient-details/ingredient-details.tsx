import React, {FC, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";

import styles from "./styles.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getIngredientsThunk} from "../../services/ingredients/thunks";
import {NotFoundPage} from "../index";

const IngredientDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { getIngredientsRequestStatus: requestStatus } = useAppSelector(state => state.ingredients);
  useEffect(() => {
    const promise = dispatch(getIngredientsThunk());
    return () => promise.abort();
  }, [dispatch]);

  let content;
  switch (requestStatus) {
    case 'failed':
      content = <NotFoundPage />;
      break;
    case 'idle' || 'pending':
      content = (
        <div>
          <TailSpin color="#4169E1" height={150} width={150}/>
        </div>
      );
      break;
    case 'succeeded':
      content = <IngredientDetails />;
      break;
  }
  return (
    <main className={styles.content}>
      {content}
    </main>
  )
}

export default IngredientDetailsPage;
