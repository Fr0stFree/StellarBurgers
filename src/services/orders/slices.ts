import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {type IPreOrder, ITotalOrders} from "./types";
import {type TRequestStatus, TWSChannelState} from "../common/types.ts";
import {makeOrderThunk} from "./thunks.ts";

interface IOrdersState {
  makeOrderRequestStatus: TRequestStatus;
  order: IPreOrder | null;
  publicOrders: ITotalOrders;
  publicOrdersChannelError: Event | null;
  publicOrdersChannelState: TWSChannelState;
  privateOrders: ITotalOrders;
  privateOrdersChannelState: TWSChannelState;
  privateOrdersChannelError: Event | null;
}

const initialState: IOrdersState = {
  makeOrderRequestStatus: 'idle',
  order: null,
  publicOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  publicOrdersChannelError: null,
  publicOrdersChannelState: 'closed',
  privateOrders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  privateOrdersChannelState: 'closed',
  privateOrdersChannelError: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hideOrder(state) {
      state.makeOrderRequestStatus = 'idle';
    },
    openPublicOrdersChannel(state, payload: PayloadAction) {
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
      state.publicOrdersChannelError = null;
    },
    publicOrdersChannelMessage(state, { payload: totalOrders }: PayloadAction<ITotalOrders>) {
      state.publicOrders.total = totalOrders.total;
      state.publicOrders.totalToday = totalOrders.totalToday;
      state.publicOrders.orders = totalOrders.orders;  // TODO: merge with existing orders
    },
    publicOrdersChannelError(state, action: PayloadAction<Event>) {
      state.publicOrdersChannelError = action.payload;
    },
    openPrivateOrdersChannel(state) {
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
      state.privateOrdersChannelError = null;
    },
    privateOrdersChannelMessage(state, { payload: totalOrders }: PayloadAction<ITotalOrders>) {
      state.privateOrders.total = totalOrders.total;
      state.privateOrders.totalToday = totalOrders.totalToday;
      state.privateOrders.orders = totalOrders.orders;  // TODO: merge with existing orders
    },
    privateOrdersChannelError(state, action: PayloadAction<Event>) {
      state.privateOrdersChannelError = action.payload;
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
