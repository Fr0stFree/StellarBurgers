import {type IOrder} from './types.ts';
import {BACKEND_BASE_URL} from "../constants.ts";

import BaseAPI from '../base-api.ts';

class OrdersAPI extends BaseAPI {
  public async sendOrder(ingredientIds: string[]) {
    const {order, name} = await this.makeRequest(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ingredients: ingredientIds}),
    });
    return {order, name} as IOrder;
  }
}

const ordersAPI = new OrdersAPI(BACKEND_BASE_URL);

export default ordersAPI;
