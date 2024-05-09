import {createAsyncThunk} from "@reduxjs/toolkit";

import {sendOrder} from "./api.ts";

export const makeOrderThunk = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[]) => await sendOrder(ingredientIds),
);