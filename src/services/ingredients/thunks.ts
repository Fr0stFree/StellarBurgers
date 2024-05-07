import {createAsyncThunk} from "@reduxjs/toolkit";

import backendApi from "../api/api.ts";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await backendApi.getIngredients(),
);
