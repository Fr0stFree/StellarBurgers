import { type IIngredient } from "../../services/ingredients/types";

export interface IMemoizedIngredients {
  buns: IIngredient[];
  sauces: IIngredient[];
  mains: IIngredient[];
}
