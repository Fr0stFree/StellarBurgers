import {type IIngredient} from './types.ts';
import {BACKEND_BASE_URL} from "../constants.ts";

import BaseAPI from '../base-api.ts';

class IngredientsAPI extends BaseAPI {
  public async getIngredients() {
    const {data} = await this.makeRequest(`${this.baseUrl}/ingredients`, {method: 'GET'});
    return data as IIngredient[];
  }
}

const ingredientsApi = new IngredientsAPI(BACKEND_BASE_URL);

export default ingredientsApi;
