import {createSlice} from '@reduxjs/toolkit';

import {IOrder} from "./types";
import {makeOrder} from "./thunks.ts";
import {RequestStatus} from "../types.ts";

interface OrdersState {
  makeOrderRequestStatus: RequestStatus;
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

export default ordersSlice.reducer;

export const {hideOrder} = ordersSlice.actions;
