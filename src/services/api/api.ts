import {type IIngredient} from '../ingredients/types.ts';
import {BACKEND_BASE_URL} from "../constants.ts";

import BaseApi from './base-api.ts';
import type {IOrder} from "../orders/types.ts";

class BackendAPI extends BaseApi {
  public async getIngredients(): Promise<IIngredient[]> {
    const {data} = await this.makeRequest(`ingredients`, {method: 'GET'});
    return data as IIngredient[];
  }

  public async sendOrder(ingredientIds: string[]): Promise<IOrder> {
    const {order, name} = await this.makeRequest(`orders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ingredients: ingredientIds}),
    });
    return {order, name} as IOrder;
  }
}

const backendApi = new BackendAPI(BACKEND_BASE_URL);

export default backendApi;
