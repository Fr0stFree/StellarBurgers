import {IngredientType} from "./const";

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: IngredientType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export interface ISelectedIngredient extends IIngredient {
  readonly uuid: string;
}
