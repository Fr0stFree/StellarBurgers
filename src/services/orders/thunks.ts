import {createAsyncThunk} from "@reduxjs/toolkit";
import backendApi from "../api/api.ts";

export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[], thunkAPI) => {
    try {
      return await backendApi.sendOrder(ingredientIds);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error)
    }
  }
);