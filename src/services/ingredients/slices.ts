import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuid4} from 'uuid';

import {type IIngredient, type ISelectedIngredient} from "./types.ts";
import {type TRequestStatus} from "../common/types.ts";
import {IngredientType} from "./const.ts";
import {makeOrderThunk} from "../orders/thunks.ts";
import {getIngredientsThunk} from "./thunks.ts";

interface IngredientsState {
  all: IIngredient[];
  selected: ISelectedIngredient[];
  getIngredientsRequestStatus: TRequestStatus;
}

const initialState: IngredientsState = {
  all: [],
  selected: [],
  getIngredientsRequestStatus: 'idle',
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
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
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.getIngredientsRequestStatus = 'pending';
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.getIngredientsRequestStatus = 'succeeded';
      state.all = action.payload;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.getIngredientsRequestStatus = 'failed';
    });
    builder.addCase(makeOrderThunk.fulfilled, (state) => {
      state.selected = [];
    });
  }
});

export const {
  addIngredient,
  addBuns,
  removeIngredient,
  reorderIngredients,
  hideIngredientsLoadingError,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
