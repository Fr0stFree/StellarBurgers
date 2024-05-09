import {REFRESH_TOKEN_STORAGE_KEY} from "./const.ts";
import {genericPersistence} from "../common/persistence.ts";

export const refreshTokenPersistence = genericPersistence<string>(REFRESH_TOKEN_STORAGE_KEY);
