import { type IIngredient } from "../../services/ingredients/types";
import { IngredientType } from "../../services/constants";

export interface IFilteredIngredients {
  [IngredientType.BUN]: IIngredient[];
  [IngredientType.SAUCE]: IIngredient[];
  [IngredientType.MAIN]: IIngredient[];
}

