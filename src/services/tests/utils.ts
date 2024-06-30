import {v4 as uuid4} from 'uuid';

import {type IExtendedOrder, type IOrder} from '../orders/types';
import {IngredientType} from "../ingredients/const";
import {IIngredient} from "../ingredients/types";
import {ICredentials} from "../auth/types";
import {TRootState} from "../../hooks";
import {initialState as authInitialState} from "../auth/slices";
import {initialState} from "../orders/slices";
import {initialState as ingredientsInitialState} from "../ingredients/slices";

export const chooseRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateOrder = (): IOrder => ({
  _id: Math.random().toString(),
  status: chooseRandom(['done', 'pending', 'created']),
  name: `Order ${Math.floor(Math.random() * 100)}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  number: Math.floor(Math.random() * 100),
  ingredients: [uuid4(), uuid4(), uuid4()],
});

export const generateIngredient = (ingredientType?: IngredientType): IIngredient => ({
  _id: uuid4(),
  name: `Ingredient ${Math.random()}`,
  type: ingredientType || chooseRandom(Object.values(IngredientType)),
  proteins: Math.random() * 100,
  fat: Math.random() * 100,
  carbohydrates: Math.random() * 100,
  calories: Math.random() * 100,
  price: Math.random(),
  image: `https://source.unsplash.com/random?sig=${Math.random()}`,
  image_mobile: `https://source.unsplash.com/random?sig=${Math.random()}`,
  image_large: `https://source.unsplash.com/random?sig=${Math.random()}`,
  __v: 0,
});

export const generateCredentials = (): ICredentials => ({
  accessToken: uuid4(),
  refreshToken: uuid4(),
});

export const generateUser = () => ({
  email: `user${Math.random()}@example.com`,
  name: `User ${Math.random()}`,
});

export const generateExtendedOrder = (): IExtendedOrder => {
  const ingredients = [generateIngredient(), generateIngredient(), generateIngredient()];
  const owner = {
    ...generateUser(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return {
    ...generateOrder(),
    ingredients,
    owner,
    price: ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
  }
};

export const generateInitialState = (): TRootState => ({
  auth: JSON.parse(JSON.stringify(authInitialState)),
  orders: JSON.parse(JSON.stringify(initialState)),
  ingredients: JSON.parse(JSON.stringify(ingredientsInitialState)),
});