import { IngredientType } from "../constants";

export interface IIngredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface ISelectedIngredient extends IIngredient {
  index: number;
}

export interface IOrder {
  name: string;
  order: {
    number: number;
  };
}
