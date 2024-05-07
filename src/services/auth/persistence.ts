import {REFRESH_TOKEN_STORAGE_KEY} from "./const.ts";

export const loadRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

export const saveRefreshToken = (token: string): void => localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)

export const dropRefreshToken = (): void => localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
