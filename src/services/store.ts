import {configureStore} from "@reduxjs/toolkit";

import ingredientsReducer from "./ingredients/slices.ts";
import ordersReducer from "./orders/slices.ts";

import authReducer from "./auth/slices.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {privateOrdersMiddleware, publicOrdersMiddleware} from "./orders/middleware.ts";


const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(publicOrdersMiddleware, privateOrdersMiddleware)
  ),
});

setupListeners(store.dispatch);

export default store;

