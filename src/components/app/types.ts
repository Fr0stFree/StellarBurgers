import { type IIngredient } from "../../services/ingredients";

export interface IMemoizedIngredients {
  buns: IIngredient[];
  sauces: IIngredient[];
  mains: IIngredient[];
}
