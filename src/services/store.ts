import {configureStore} from "@reduxjs/toolkit";

import ingredientsReducer from "./ingredients/slices";
import ordersReducer from "./orders/slices";

import authReducer from "./auth/slices";
import {setupListeners} from "@reduxjs/toolkit/query";
import {privateOrdersMiddleware, publicOrdersMiddleware} from "./orders/middleware";


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

