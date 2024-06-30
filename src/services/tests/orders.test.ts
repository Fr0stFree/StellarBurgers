import * as axios from "axios";
import {v4 as uuid4} from 'uuid';
import {OK} from "http-status";

import ordersReducer, {
  closePublicOrdersChannel,
  hideOrder,
  initialState,
  IOrdersState,
  openPublicOrdersChannel,
  publicOrdersChannelClosed,
  publicOrdersChannelError,
  publicOrdersChannelMessage,
  publicOrdersChannelOpened,
} from '../orders/slices';
import {generateCredentials, generateExtendedOrder, generateInitialState, generateOrder,} from "./utils";
import {makeOrderThunk} from "../orders/thunks";
import {mergeOrders} from "../orders/utils";
import {TRootState} from "../../hooks";

jest.mock('axios');

describe('should handle orders slice', () => {
  let preloadedState = {} as IOrdersState;
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should return an initial state', () => {
    expect(ordersReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle order hiding', () => {
    expect(ordersReducer(preloadedState, hideOrder())).toEqual({
      ...preloadedState,
      makeOrderRequestStatus: 'idle',
    });
  });

  it('should handle ws channel opening', () => {
    expect(ordersReducer(preloadedState, openPublicOrdersChannel('localhost'))).toEqual({
      ...preloadedState,
      publicOrdersChannelState: 'connecting',
      publicOrdersChannelError: null,
    });
  });

  it('should handle ws channel closing', () => {
    expect(ordersReducer(preloadedState, closePublicOrdersChannel())).toEqual({
      ...preloadedState,
      publicOrdersChannelState: 'closing',
      publicOrdersChannelError: null,
    });
  });

  it('should handle ws channel opened event', () => {
    expect(ordersReducer(preloadedState, publicOrdersChannelOpened())).toEqual({
      ...preloadedState,
      publicOrdersChannelState: 'open',
      publicOrdersChannelError: null,
    });
  });

  it('should handle ws channel closed event', () => {
    expect(ordersReducer(preloadedState, publicOrdersChannelClosed())).toEqual({
      ...preloadedState,
      publicOrdersChannelState: 'closed',
    });
  });

  it('should handle new ws message', () => {
    const message = {
      orders: [generateOrder()],
      totalToday: 10,
      total: 100,
    };

    expect(ordersReducer(preloadedState, publicOrdersChannelMessage(message))).toEqual({
      ...preloadedState,
      publicOrders: message.orders,
      ordersAmountToday: message.totalToday,
      ordersAmountTotal: message.total,
    });
  });

  it('should handle orders merge on new ws message', () => {
    preloadedState = {
      ...preloadedState,
      publicOrders: [generateOrder()],
      ordersAmountToday: 5,
      ordersAmountTotal: 50,
    };
    const message = {
      orders: [generateOrder(), generateOrder()],
      totalToday: 15,
      total: 150,
    };

    expect(ordersReducer(preloadedState, publicOrdersChannelMessage(message))).toEqual({
      ...preloadedState,
      publicOrders: mergeOrders(preloadedState.publicOrders, message.orders),
      ordersAmountToday: message.totalToday,
      ordersAmountTotal: message.total,
    });
  });

  it('should handle ws channel error', () => {
    expect(ordersReducer(preloadedState, publicOrdersChannelError('Connection lost'))).toEqual({
      ...preloadedState,
      publicOrdersChannelError: 'Connection lost',
    });
  });
});

describe('should handle order thunks', () => {
  let dispatch = jest.fn();
  let getState = jest.fn();
  let state = {} as TRootState;

  beforeEach(() => {
    state = generateInitialState();
    getState.mockReturnValue(state);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should send order successfully', async () => {
    const expectedOrder = generateExtendedOrder();
    state.auth.accessToken = generateCredentials().accessToken;
    axios.post.mockImplementation(() => Promise.resolve({
      data: {order: expectedOrder, success: true},
      status: OK
    }));

    const result = await makeOrderThunk([uuid4()])(dispatch, getState, undefined);

    expect(result.payload).toEqual(expectedOrder);
    expect(result.type).toBe('orders/makeOrder/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).toHaveBeenCalled();
  });

  it('should reject with error if no access token found', async () => {
    const result = await makeOrderThunk([uuid4()])(dispatch, getState, undefined);

    expect(result.type).toBe('orders/makeOrder/rejected');
    expect(result.payload.message).toBe('No access token found');
    expect(result.payload.name).toBe('UnauthorizedError');
    expect(result.error).toBeTruthy();
    expect(axios.post).not.toHaveBeenCalled();
    expect(getState).toHaveBeenCalled();
  });
});