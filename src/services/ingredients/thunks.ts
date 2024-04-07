import { loadIngredients } from "./api";
import { ingredientsLoading, ingredientsLoadingSuccess, ingredientsLoadingFail } from "./slices";
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
