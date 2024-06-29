import axios from "axios";

import {type IIngredient} from "./types";
import {validateResponse} from "../common/api";
import {TResponseBody} from "../common/types";
import {BACKEND_API_BASE_URL} from "../common/const";


export const getIngredients = async (): Promise<IIngredient[]> => {
  const url = `${BACKEND_API_BASE_URL}/ingredients`;
  const response = await axios.get<TResponseBody<IIngredient[], 'data'>>(url);
  validateResponse(response);
  return response.data.data;
}
