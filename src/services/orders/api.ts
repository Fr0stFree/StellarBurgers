import axios from "axios";

import {type IOrderWithOwner, type IPreOrder} from "./types.ts";
import {validateResponse} from "../common/api.ts";
import {TResponseBody} from "../common/types.ts";
import {BACKEND_API_BASE_URL} from "../common/const.ts";

export const sendOrder = async (ingredientIds: string[]): Promise<IPreOrder> => {
  const url = `${BACKEND_API_BASE_URL}/orders`;
  const response = await axios.post<TResponseBody<IPreOrder>>(url, {ingredients: ingredientIds});
  validateResponse(response);
  return response.data;
}

export const getOrder = async (orderNumber: number): Promise<IOrderWithOwner> => {
  const url = `${BACKEND_API_BASE_URL}/orders/${orderNumber}`;
  const response = await axios.get<TResponseBody<[IOrderWithOwner] | [], 'orders'>>(url);
  validateResponse(response);
  const {orders} = response.data;
  if (!orders.length) {
    throw new Error('Заказ не найден');
  }
  return orders[0]
}
