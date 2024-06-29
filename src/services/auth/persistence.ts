import {REFRESH_TOKEN_STORAGE_KEY} from "./const";
import {genericPersistence} from "../common/persistence";

export const refreshTokenPersistence = genericPersistence<string>(REFRESH_TOKEN_STORAGE_KEY);
