import axios from "axios";

import {type IExtendedOrder, type IOrderWithOwner} from "./types";
import {validateResponse} from "../common/api";
import {TResponseBody} from "../common/types";
import {BACKEND_API_BASE_URL} from "../common/const";

export const sendOrder = async (ingredientIds: string[], accessToken: string): Promise<IExtendedOrder> => {
  const url = `${BACKEND_API_BASE_URL}/orders`;
  const config = {headers: {Authorization: accessToken}};
  const response = await axios.post<TResponseBody<IExtendedOrder, 'order'>>(url, {ingredients: ingredientIds}, config);
  validateResponse(response);
  return response.data.order;
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
