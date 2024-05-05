import {createAsyncThunk} from "@reduxjs/toolkit";
import backendApi from "../api/api.ts";

export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[]) => await backendApi.sendOrder(ingredientIds),
);