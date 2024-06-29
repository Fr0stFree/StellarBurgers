import {initialState, ordersSlice} from '../orders/slices.ts';
import store from '../store.ts';
import {generateOrder} from "./utils.ts";

it('should generate a slice', () => {
  expect(ordersSlice.name).toBe('orders');
  expect(ordersSlice.getInitialState()).toEqual(initialState);
});

it('should hide order', () => {
  store.dispatch(ordersSlice.actions.hideOrder());
  const state = store.getState();
  expect(state.orders.makeOrderRequestStatus).toBe('idle');
});

it('should close public orders wss channel', () => {
  store.dispatch(ordersSlice.actions.closePublicOrdersChannel());
  const state = store.getState();
  expect(state.orders.publicOrdersChannelState).toBe('closing');
  expect(state.orders.publicOrdersChannelError).toBeNull();
});

it('should handle closed public orders wss channel', () => {
  store.dispatch(ordersSlice.actions.publicOrdersChannelClosed());
  const state = store.getState();
  expect(state.orders.publicOrdersChannelState).toBe('closed');
});

it('should handle new message from public orders wss channel', () => {
  const message = {
    orders: [generateOrder(), generateOrder()],
    totalToday: 10,
    total: 100,
  };

  store.dispatch(ordersSlice.actions.publicOrdersChannelMessage(message));

  const {publicOrders, ordersAmountToday, ordersAmountTotal} = store.getState().orders;
  expect(publicOrders).toHaveLength(2);
  expect(ordersAmountToday).toBe(10);
  expect(ordersAmountTotal).toBe(100);
});

it('should handle error in public orders wss channel', () => {
  store.dispatch(ordersSlice.actions.publicOrdersChannelError('Connection lost'));
  const state = store.getState();
  expect(state.orders.publicOrdersChannelError).toBe('Connection lost');
});
