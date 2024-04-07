import { configureStore } from "@reduxjs/toolkit";
import { type UnknownAction } from "redux";
import { thunk, ThunkAction } from 'redux-thunk';

import ingredientsReducer from "./ingredients/slices";


const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>