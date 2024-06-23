import {createAsyncThunk} from "@reduxjs/toolkit";

import {getIngredients} from "./api";

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredients(),
);
