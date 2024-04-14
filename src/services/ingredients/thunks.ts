import {createAsyncThunk} from "@reduxjs/toolkit";
import backendApi from "../api/api.ts";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, thunkAPI) => {
    try {
      return await backendApi.getIngredients();
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
