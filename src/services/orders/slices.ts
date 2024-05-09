import {createSlice} from '@reduxjs/toolkit';

import {IOrder} from "./types";
import {makeOrderThunk} from "./thunks.ts";
import {TRequestStatus} from "../types.ts";

interface OrdersState {
  makeOrderRequestStatus: TRequestStatus;
  order: IOrder | null;
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
    builder.addCase(makeOrderThunk.pending, (state) => {
      state.makeOrderRequestStatus = 'pending';
    });
    builder.addCase(makeOrderThunk.fulfilled, (state, action) => {
      state.makeOrderRequestStatus = 'succeeded';
      state.order = action.payload;
    });
    builder.addCase(makeOrderThunk.rejected, (state) => {
      state.makeOrderRequestStatus = 'failed';
    });
  }
});

export default ordersSlice.reducer;

export const {hideOrder} = ordersSlice.actions;
