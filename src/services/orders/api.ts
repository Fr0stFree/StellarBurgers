import axios from "axios";

import {type IOrder} from "./types.ts";
import {BACKEND_BASE_URL, validateResponse} from "../common/api.ts";
import {TResponseBody} from "../common/types.ts";

export const sendOrder = async (ingredientIds: string[]): Promise<IOrder> => {
  const url = `${BACKEND_BASE_URL}/orders`;
  const response = await axios.post<TResponseBody<IOrder>>(url, {ingredients: ingredientIds});
  validateResponse(response);
  return response.data;
}
