import axios from "axios";

import {type IIngredient} from "./types.ts";
import {validateResponse} from "../common/api.ts";
import {TResponseBody} from "../common/types.ts";
import {BACKEND_API_BASE_URL} from "../common/const.ts";


export const getIngredients = async (): Promise<IIngredient[]> => {
  const url = `${BACKEND_API_BASE_URL}/ingredients`;
  const response = await axios.get<TResponseBody<IIngredient[], 'data'>>(url);
  validateResponse(response);
  return response.data.data;
}
