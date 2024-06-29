import {type IIngredient} from "../ingredients/types";
import {type IUser} from "../auth/types";

interface BaseOrder {
  readonly _id: string;
  readonly status: 'done' | 'pending' | 'created' | 'canceled';
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
}

export interface IOrder extends BaseOrder {
  readonly ingredients: string[];
}

export interface IExtendedOrder extends BaseOrder {
  readonly ingredients: IIngredient[];
  readonly owner: IUser & {createdAt: string, updatedAt: string}
  readonly price: number;
}

export interface IOrderWithOwner extends IOrder {
  readonly owner: string;
}

export interface IDecodedAccessToken {
  id: string,
  iat: number,
  exp: number,
}