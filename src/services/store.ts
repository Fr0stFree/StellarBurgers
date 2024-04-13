import {configureStore} from "@reduxjs/toolkit";

import ingredientsReducer from "./ingredients/slices.ts";
import ordersReducer from "./orders/slices.ts";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
