import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid4} from 'uuid';

import {type IIngredient, type ISelectedIngredient} from "./types.ts";
import {IngredientType} from "./const.ts";
import {makeOrder} from "../orders/thunks.ts";
import {getIngredients} from "./thunks.ts";
import {RequestStatus} from "../types.ts";

interface IngredientsState {
  all: IIngredient[];
  selected: ISelectedIngredient[];
  previewed: IIngredient | null;
  getIngredientsRequestStatus: RequestStatus;
}

const initialState: IngredientsState = {
  all: [],
  selected: [],
  previewed: null,
  getIngredientsRequestStatus: 'idle',
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    previewIngredient(state, action: PayloadAction<IIngredient>) {
      state.previewed = action.payload;
    },
    hidePreviewedIngredient(state) {
      state.previewed = null;
    },
    addBuns: {
      reducer: (state, action: PayloadAction<ISelectedIngredient[]>) => {
        state.selected = [
          action.payload[0],
          ...state.selected.filter((ingredient) => ingredient.type !== IngredientType.BUN),
          action.payload[1],
        ];
      },
      prepare: (ingredient: IIngredient) => ({payload: [{...ingredient, uuid: uuid4()}, {...ingredient, uuid: uuid4()}]}),
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<ISelectedIngredient>) => {
        const isBunAdded = state.selected.some(ingredient => ingredient.type === IngredientType.BUN);
        isBunAdded ? state.selected.splice(-1, 0, action.payload) : state.selected.push(action.payload);
      },
      prepare: (ingredient: IIngredient) => ({payload: {...ingredient, uuid: uuid4()}}),
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.selected.splice(action.payload, 1)
    },
    reorderIngredients(state, action: PayloadAction<ISelectedIngredient[]>) {
      state.selected = action.payload;
    },
    hideIngredientsLoadingError(state) {
      state.getIngredientsRequestStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.getIngredientsRequestStatus = 'pending';
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.getIngredientsRequestStatus = 'succeeded';
      state.all = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.getIngredientsRequestStatus = 'failed';
    });
    builder.addCase(makeOrder.fulfilled, (state) => {
      state.selected = [];
    });
  }
});

export const {
  addIngredient,
  addBuns,
  previewIngredient,
  hidePreviewedIngredient,
  removeIngredient,
  reorderIngredients,
  hideIngredientsLoadingError,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
