import {createAsyncThunk} from "@reduxjs/toolkit";

import {sendOrder, getOrder} from "./api.ts";

export const makeOrderThunk = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[]) => await sendOrder(ingredientIds),
);

export const getOrderThunk = createAsyncThunk(
  'orders/getOrder',
  async (orderNumber: number) => await getOrder(orderNumber),
);
