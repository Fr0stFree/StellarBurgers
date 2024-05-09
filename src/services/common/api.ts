import {BAD_REQUEST} from "http-status";
import {AxiosResponse} from "axios";

export const BACKEND_BASE_URL: string = 'https://norma.nomoreparties.space/api';

export function validateResponse(response: AxiosResponse): AxiosResponse {
  const { data, status, statusText } = response;
  if (status > BAD_REQUEST) {
    throw new Error(`Ошибка ${status}: ${statusText}`);
  }
  if (!data.success) {
    const { data: { message } } = response;
    throw new Error(message || 'Что-то пошло не так');
  }
  return response;
}
