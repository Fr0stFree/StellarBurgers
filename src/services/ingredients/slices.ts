import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from "@reduxjs/toolkit";

import { type IIngredient } from "./types";

interface IngredientsState {
  all: IIngredient[],
  selected: IIngredient[],
  previewed: IIngredient | null,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  order: null | object,
}

const initialState: IngredientsState = {
  all: [],
  selected: [],
  previewed: null,
  loading: 'idle',
  order: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsLoading(state) {
      state.loading = 'pending';
    },
    ingredientsLoadingSuccess(state, action: PayloadAction<IIngredient[]>) {
      state.loading = 'succeeded';
      state.all = action.payload;
    },
    ingredientsLoadingFail(state) {
      state.loading = 'failed';
    },
    previewIngredient(state, action: PayloadAction<IIngredient>) {
      state.previewed = action.payload;
    },
    viewOrder(state, action: PayloadAction<object>) {
      state.order = action.payload;
    },
    closeModal(state) {
      state.previewed = null;
      state.order = null;
    },
  },
});

export const {
  ingredientsLoading,
  ingredientsLoadingSuccess,
  ingredientsLoadingFail,
  previewIngredient,
  viewOrder,
  closeModal,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
