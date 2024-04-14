import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {IOrder} from "./types";
import ordersAPI from "./api.ts";

interface OrdersState {
  makeOrderRequestStatus: 'idle' | 'pending' | 'succeeded' | 'failed',
  order: IOrder | null,
}

const initialState: OrdersState = {
  makeOrderRequestStatus: 'idle',
  order: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hideOrder(state) {
      state.makeOrderRequestStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.pending, (state) => {
      state.makeOrderRequestStatus = 'pending';
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.makeOrderRequestStatus = 'succeeded';
      state.order = action.payload;
    });
    builder.addCase(makeOrder.rejected, (state) => {
      state.makeOrderRequestStatus = 'failed';
    });
  }
});


export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[], thunkAPI) => {
    try {
      return await ordersAPI.sendOrder(ingredientIds);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error)
    }
  }
);

export default ordersSlice.reducer;

export const {hideOrder} = ordersSlice.actions;
