import axios from "axios";

import {type IClient, type ICredentials, type IUser, type IUserWithPassword} from "./types.ts";
import {type TResponseBody} from "../common/types.ts";
import {validateResponse} from "../common/api.ts";
import {BACKEND_API_BASE_URL} from "../common/const.ts";

export const getUser = async (accessToken: string): Promise<IUser> => {
  const url = `${BACKEND_API_BASE_URL}/auth/user`;
  const config = {headers: {Authorization: accessToken}};
  const response = await axios.get<TResponseBody<IUser, 'user'>>(url, config);
  validateResponse(response);
  return response.data.user;
}

export const updateUser = async (data: Partial<IUserWithPassword>, accessToken: string): Promise<IUser> => {
  const url = `${BACKEND_API_BASE_URL}/auth/user`;
  const config = {headers: {Authorization: accessToken}};
  const response = await axios.patch<TResponseBody<IUser, 'user'>>(url, data, config);
  validateResponse(response);
  return response.data.user;
}

export const registerUser = async (data: IUserWithPassword): Promise<IClient> => {
  const url = `${BACKEND_API_BASE_URL}/auth/register`;
  const response = await axios.post<TResponseBody<IClient>>(url, data);
  validateResponse(response);
  return response.data;
}

export const loginUser = async (data: Omit<IUserWithPassword, 'name'>): Promise<IClient> => {
  const url = `${BACKEND_API_BASE_URL}/auth/login`;
  const response = await axios.post<TResponseBody<IClient>>(url, data);
  validateResponse(response);
  return response.data;
}

export const logoutUser = async (refreshToken: string): Promise<void> => {
  const url = `${BACKEND_API_BASE_URL}/auth/logout`;
  const response = await axios.post<TResponseBody>(url, {token: refreshToken});
  validateResponse(response);
}

export const updateAccessToken = async (refreshToken: string): Promise<ICredentials> => {
  const url = `${BACKEND_API_BASE_URL}/auth/token`;
  const response = await axios.post<TResponseBody<ICredentials>>(url, {token: refreshToken});
  validateResponse(response);
  return response.data;
}

export const requestPasswordReset = async (email: string): Promise<void> => {
  const url = `${BACKEND_API_BASE_URL}/auth/password-reset`;
  const response = await axios.post<TResponseBody>(url, {email});
  validateResponse(response);
}

export const resetPassword = async (data: {password: string, confirmationCode: string}): Promise<void> => {
  const url = `${BACKEND_API_BASE_URL}/auth/password-reset/reset`;
  const response = await axios.post<TResponseBody>(url, {password: data.password, token: data.confirmationCode});
  validateResponse(response);
}