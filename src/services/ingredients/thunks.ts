import {loadIngredients, sendOrder} from "./api";
import {
  ingredientsLoading,
  ingredientsLoadingSuccess,
  ingredientsLoadingFail,
  orderLoading,
  orderLoadingSuccess,
  orderLoadingFail
} from "./slices";
import { AppThunk } from "../store";

export const thunkLoadIngredients = (): AppThunk => async (dispatch) => {
  dispatch(ingredientsLoading());
  try {
    const ingredients = await loadIngredients();
    dispatch(ingredientsLoadingSuccess(ingredients));
  } catch (error) {
    dispatch(ingredientsLoadingFail());
  }
}

export const thunkMakeOrder = (ingredientIds: string[]): AppThunk => async (dispatch) => {
  dispatch(orderLoading());
  try {
    const order = await sendOrder(ingredientIds);
    dispatch(orderLoadingSuccess(order));
  } catch (error) {
    dispatch(orderLoadingFail());
  }
}
