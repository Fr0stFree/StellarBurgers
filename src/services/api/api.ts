import BaseApi from './base-api.ts';
import {BACKEND_BASE_URL} from "./constants.ts";
import {type IIngredient} from '../ingredients/types.ts';
import {type IOrder} from "../orders/types.ts";
import {type IClient, type IUser} from "../auth/types.ts";

class BackendAPI extends BaseApi {
  public async getIngredients(): Promise<IIngredient[]> {
    const { data } = await this.get(`ingredients`)
    return data as IIngredient[];
  }

  public async sendOrder(ingredientIds: string[]): Promise<IOrder> {
    return await this.post(`orders`, {ingredients: ingredientIds});
  }

  public async register({ email, password, name }: { email: string, password: string, name: string }): Promise<IClient> {
    return await this.post(`auth/register`, {email, password, name});
  }

  public async login({ email, password }: { email: string, password: string }): Promise<IClient> {
    return await this.post(`auth/login`, {email, password});
  }

  public async updateAccessToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
    return await this.post(`auth/token`, {token: refreshToken});
  }

  public async getUser(accessToken: string): Promise<IUser> {
    const response = await this.get(`auth/user`, {accessToken});
    const { user: { email, name } } = response;
    return { email, name };
  }

  public async updateUser(userData: {email?: string, name?: string, password?: string}, accessToken: string): Promise<IUser> {
    const response = await this.patch(`auth/user`, userData, {accessToken});
    const { user: { email: userEmail, name: userName } } = response;
    return { email: userEmail, name: userName };
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.post(`auth/logout`, {token: refreshToken});
  }

  public async requestPasswordReset(email: string): Promise<void> {
    await this.post(`password-reset`, {email});
  }

  public async resetPassword ({password, confirmationCode}: {password: string, confirmationCode: string}): Promise<void> {
    await this.post(`password-reset/reset`, {password, token: confirmationCode});
  }
}

const backendApi = new BackendAPI(BACKEND_BASE_URL);

export default backendApi;
