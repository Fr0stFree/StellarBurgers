import axios from "axios";

import {type IIngredient} from "./types.ts";
import {BACKEND_BASE_URL, validateResponse} from "../common/api.ts";

export const getIngredients = async (): Promise<IIngredient[]> => {
  const url = `${BACKEND_BASE_URL}/ingredients`;
  const response = await axios.get<{data: IIngredient[]}>(url);
  validateResponse(response);
  return response.data.data;
}
