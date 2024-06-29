import {createAsyncThunk, SerializedError} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

import {getOrder, sendOrder} from "./api";
import {type TRootState} from "../../hooks";
import {type IDecodedAccessToken, type IOrderWithOwner} from "./types";

export const makeOrderThunk = createAsyncThunk(
  'orders/makeOrder',
  async (ingredientIds: string[], thunkAPI) => {
    const state = thunkAPI.getState() as TRootState;
    const accessToken = state.auth.accessToken;
    if (!accessToken) {
      return thunkAPI.rejectWithValue({
        'message': 'No access token found',
        'name': 'UnauthorizedError',
      }) as SerializedError;
    }
    return await sendOrder(ingredientIds, accessToken);
  },
);



export const getOrderThunk = createAsyncThunk(
  'orders/getOrder',
  async (orderNumber: number, thunkAPI): Promise<[IOrderWithOwner, boolean]> => {
    const {auth: {accessToken}} = thunkAPI.getState() as TRootState;
    const order = await getOrder(orderNumber)
    if (!accessToken) {
      return [order, false]
    }
    const {id: userId} = jwtDecode(accessToken) as IDecodedAccessToken;
    if (userId !== order.owner) {
      return [order, false]
    }
    return [order, true]
  },
);
