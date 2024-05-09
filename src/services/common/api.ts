import {BAD_REQUEST} from "http-status";
import {AxiosResponse} from "axios";

import {TResponseBody} from "./types.ts";

export const BACKEND_BASE_URL: string = 'https://norma.nomoreparties.space/api';

export function validateResponse(response: AxiosResponse<TResponseBody>): AxiosResponse<TResponseBody> {
  const { data, status, statusText } = response;
  if (status > BAD_REQUEST) {
    throw new Error(`Ошибка ${status}: ${statusText}`);
  }
  const { success, message } = data;
  if (!success) {
    throw new Error(message || 'Что-то пошло не так');
  }
  return response;
}
