import { ReactNode } from "react";
import type {IIngredient} from "../../services/ingredients";

export interface IModalState {
  isOpen: boolean;
  children: ReactNode;
}

export interface IMemoizedIngredients {
  buns: IIngredient[];
  sauces: IIngredient[];
  mains: IIngredient[];
}