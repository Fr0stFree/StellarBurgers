import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {type IExtendedOrder, type IOrder} from "./types";
import {type TRequestStatus, TWSChannelState} from "../common/types.ts";
import {makeOrderThunk, getOrderThunk} from "./thunks.ts";
import {mergeOrders} from "./utils.ts";

interface IOrdersState {
  makeOrderRequestStatus: TRequestStatus;
  getOrderRequestStatus: TRequestStatus;
  order: IExtendedOrder | null;
  publicOrders: IOrder[];
  privateOrders: IOrder[];
  ordersAmountToday: number;
  ordersAmountTotal: number;
  publicOrdersChannelError: Event | null;
  publicOrdersChannelState: TWSChannelState;
  privateOrdersChannelState: TWSChannelState;
  privateOrdersChannelError: Event | null;
}

const initialState: IOrdersState = {
  makeOrderRequestStatus: 'idle',
  getOrderRequestStatus: 'idle',
  order: null,
  publicOrders: [],
  privateOrders: [],
  ordersAmountToday: 0,
  ordersAmountTotal: 0,
  publicOrdersChannelError: null,
  privateOrdersChannelError: null,
  publicOrdersChannelState: 'closed',
  privateOrdersChannelState: 'closed',
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hideOrder(state) {
      state.makeOrderRequestStatus = 'idle';
    },
    openPublicOrdersChannel(state, action: PayloadAction<string>) {
      state.publicOrdersChannelState = 'connecting';
      state.publicOrdersChannelError = null;
    },
    closePublicOrdersChannel(state) {
      state.publicOrdersChannelState = 'closing';
      state.publicOrdersChannelError = null;
    },
    publicOrdersChannelOpened(state) {
      state.publicOrdersChannelState = 'open';
      state.publicOrdersChannelError = null;
    },
    publicOrdersChannelClosed(state) {
      state.publicOrdersChannelState = 'closed';
    },
    publicOrdersChannelMessage(state, {payload}: PayloadAction<{orders: IOrder[], totalToday: number, total: number}>) {
      state.publicOrders = mergeOrders(state.publicOrders, payload.orders);
      state.ordersAmountToday = payload.totalToday;
      state.ordersAmountTotal = payload.total;
    },
    publicOrdersChannelError(state, {payload}: PayloadAction<Event>) {
      state.publicOrdersChannelError = payload;
    },
    openPrivateOrdersChannel(state, action: PayloadAction<string>) {
      state.privateOrdersChannelState = 'connecting';
      state.privateOrdersChannelError = null;
    },
    closePrivateOrdersChannel(state) {
      state.privateOrdersChannelState = 'closing';
      state.privateOrdersChannelError = null;
    },
    privateOrdersChannelOpened(state) {
      state.privateOrdersChannelState = 'open';
      state.privateOrdersChannelError = null;
    },
    privateOrdersChannelClosed(state) {
      state.privateOrdersChannelState = 'closed';
    },
    privateOrdersChannelMessage(state, {payload}: PayloadAction<{orders: IOrder[], totalToday: number, total: number}>) {
      state.privateOrders = mergeOrders(state.privateOrders, payload.orders);
      state.ordersAmountToday = payload.totalToday;
      state.ordersAmountTotal = payload.total;
    },
    privateOrdersChannelError(state, action: PayloadAction<Event>) {
      state.privateOrdersChannelError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrderThunk.pending, (state) => {
      state.makeOrderRequestStatus = 'pending';
      state.order = null;
    });
    builder.addCase(makeOrderThunk.fulfilled, (state, action) => {
      state.makeOrderRequestStatus = 'succeeded';
      state.order = action.payload as IExtendedOrder;
    });
    builder.addCase(makeOrderThunk.rejected, (state) => {
      state.makeOrderRequestStatus = 'failed';
      state.order = null;
    });
    builder.addCase(getOrderThunk.pending, (state) => {
      state.getOrderRequestStatus = 'pending';
    });
    builder.addCase(getOrderThunk.fulfilled, (state, {payload: [order, isPrivate]}) => {
      state.getOrderRequestStatus = 'succeeded';
      state.publicOrders = mergeOrders(state.publicOrders, [order]);
      if (isPrivate) {
        state.privateOrders = mergeOrders(state.privateOrders, [order]);
      }
    });
    builder.addCase(getOrderThunk.rejected, (state) => {
      state.getOrderRequestStatus = 'failed';
    });
  }
});

export default ordersSlice.reducer;

export const {
  hideOrder,
  openPublicOrdersChannel,
  closePublicOrdersChannel,
  publicOrdersChannelOpened,
  publicOrdersChannelClosed,
  publicOrdersChannelError,
  publicOrdersChannelMessage,
  openPrivateOrdersChannel,
  closePrivateOrdersChannel,
  privateOrdersChannelOpened,
  privateOrdersChannelClosed,
  privateOrdersChannelError,
  privateOrdersChannelMessage,
} = ordersSlice.actions;
