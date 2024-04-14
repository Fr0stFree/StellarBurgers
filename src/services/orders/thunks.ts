import {createAsyncThunk} from "@reduxjs/toolkit";
import backendApi from "../api/api.ts";

export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[], thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return await backendApi.sendOrder(ingredientIds);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error)
    }
  }
);