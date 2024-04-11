import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IIngredient, IOrder, ISelectedIngredient } from "./types";
import { IngredientType } from "../constants";

type OpenedModal = {
  isOpen: true;
  contentType: 'ingredient' | 'order';
}
type ClosedModal = {
  isOpen: false;
}

interface IngredientsState {
  all: IIngredient[],
  selected: ISelectedIngredient[],
  previewed: IIngredient | null,
  ingredientsLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
  orderLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
  order: IOrder | null,
  modal: OpenedModal | ClosedModal,
}

const initialState: IngredientsState = {
  all: [],
  selected: [],
  previewed: null,
  ingredientsLoading: 'idle',
  orderLoading: 'idle',
  order: null,
  modal: { isOpen: false },
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsLoading(state) {
      state.ingredientsLoading = 'pending';
    },
    ingredientsLoadingSuccess(state, action: PayloadAction<IIngredient[]>) {
      state.ingredientsLoading = 'succeeded';
      state.all = action.payload;
    },
    ingredientsLoadingFail(state) {
      state.ingredientsLoading = 'failed';
    },
    orderLoading(state) {
      state.orderLoading = 'pending';
    },
    orderLoadingSuccess(state, action: PayloadAction<IOrder>) {
      state.orderLoading = 'succeeded';
      state.order = action.payload;
      state.modal = { isOpen: true, contentType: 'order' };
    },
    orderLoadingFail(state) {
      state.orderLoading = 'failed';
    },
    previewIngredient(state, action: PayloadAction<IIngredient>) {
      state.previewed = action.payload;
      state.modal = { isOpen: true, contentType: 'ingredient' };
    },
    addIngredient(state, action: PayloadAction<IIngredient>) {
      let result: IIngredient[] = [...state.selected];
      if (action.payload.type === IngredientType.BUN) {
        result = result.filter(ingredient => ingredient.type !== IngredientType.BUN)
        result.unshift(action.payload);
        result.push(action.payload);
      } else {
        result[0]?.type === IngredientType.BUN ? result.splice(1, 0, action.payload) : result.unshift(action.payload);
      }
      state.selected = result.map((ingredient, index) => ({ ...ingredient, index }));
    },
    removeIngredient(state, action: PayloadAction<ISelectedIngredient>) {
      const result =  [...state.selected];
      result.splice(action.payload.index, 1);
      state.selected = result.map((ingredient, index) => ({ ...ingredient, index }));
    },
    moveIngredient(state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) {
      const result = [...state.selected];
      const [draggedIngredient] = result.splice(action.payload.dragIndex, 1);
      result.splice(action.payload.hoverIndex, 0, draggedIngredient);
      state.selected = result.map((ingredient, index) => ({ ...ingredient, index }));
    },
    closeModal(state) {
      state.modal = { isOpen: false };
    },
  },
});

export const {
  ingredientsLoading,
  ingredientsLoadingSuccess,
  ingredientsLoadingFail,
  orderLoading,
  orderLoadingSuccess,
  orderLoadingFail,
  addIngredient,
  previewIngredient,
  removeIngredient,
  moveIngredient,
  closeModal,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
