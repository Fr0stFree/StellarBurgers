import BaseApi from './base-api.ts';
import {BACKEND_BASE_URL} from "./constants.ts";
import {type IIngredient} from '../ingredients/types.ts';
import {type IOrder} from "../orders/types.ts";
import {type IClient} from "../auth/types.ts";

class BackendAPI extends BaseApi {
  public async getIngredients(): Promise<IIngredient[]> {
    const { data } = await this.get(`ingredients`)
    return data as IIngredient[];
  }

  public async sendOrder(ingredientIds: string[]): Promise<IOrder> {
    return await this.post(`orders`, {ingredients: ingredientIds});
  }

  public async register(email: string, password: string, name: string): Promise<IClient> {
    return await this.post(`auth/register`, {email, password, name});
  }

  public async login(email: string, password: string): Promise<IClient> {
    return await this.post(`auth/login`, {email, password});
  }

  public async refreshToken(token: string): Promise<{accessToken: string, refreshToken: string}> {
    return await this.post(`auth/token`, {token});
  }

  public async logout(token: string): Promise<void> {
    await this.post(`auth/logout`, {token});
  }
}

const backendApi = new BackendAPI(BACKEND_BASE_URL);

export default backendApi;
