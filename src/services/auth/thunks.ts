import {createAsyncThunk, SerializedError} from "@reduxjs/toolkit";

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateAccessToken,
  updateUser,
} from "./api.ts";
import {refreshTokenPersistence} from "./persistence.ts";
import {type TAppDispatch, type TRootState} from "../../hooks.ts";
import {type IUserWithPassword} from "./types.ts";
import {closePrivateOrdersChannel, openPrivateOrdersChannel, openPublicOrdersChannel} from "../orders/slices.ts";
import {BACKEND_WS_BASE_URL} from "../common/const.ts";

const openPrivateChannel = (dispatch: TAppDispatch, accessToken: string): void => {
  const privateOrderChannelUrl = new URL(`${BACKEND_WS_BASE_URL}/orders`);
  if (accessToken.startsWith('Bearer ')) {
    accessToken = accessToken.slice(7);
  }
  privateOrderChannelUrl.searchParams.set('token', accessToken);
  dispatch(openPrivateOrdersChannel(privateOrderChannelUrl.toString()));
}

const openPublicChannel = (dispatch: TAppDispatch): void => {
  const publicOrdersChannel = new URL(`${BACKEND_WS_BASE_URL}/orders/all`);
  dispatch(openPublicOrdersChannel(publicOrdersChannel.toString()));
}

export const startSessionThunk = createAsyncThunk(
  'auth/startSession',
  async (_, thunkAPI) => {
    openPublicChannel(thunkAPI.dispatch as TAppDispatch);
    const refreshToken = refreshTokenPersistence.load();
    if (!refreshToken) {
      return thunkAPI.fulfillWithValue({user: null, accessToken: null, refreshToken: null});
    }
    const {accessToken, refreshToken: newRefreshToken} = await updateAccessToken(refreshToken);
    const user = await getUser(accessToken);
    refreshTokenPersistence.save(newRefreshToken);
    openPrivateChannel(thunkAPI.dispatch as TAppDispatch, accessToken);
    return {user, accessToken, refreshToken: newRefreshToken};
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (payload: IUserWithPassword, thunkAPI) => {
    const client = await registerUser(payload);
    refreshTokenPersistence.save(client.refreshToken);
    openPrivateChannel(thunkAPI.dispatch as TAppDispatch, client.accessToken);
    return client;
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (payload: Omit<IUserWithPassword, 'name'>, thunkAPI) => {
    const client = await loginUser(payload);
    refreshTokenPersistence.save(client.refreshToken);
    openPrivateChannel(thunkAPI.dispatch as TAppDispatch, client.accessToken);
    return client;
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (payload: Partial<IUserWithPassword>, thunkAPI) => {
    const state = thunkAPI.getState() as TRootState;
    const {accessToken} = state.auth;
    if (!accessToken) {
      return thunkAPI.rejectWithValue({
        'message': 'No access token found',
        'name': 'UnauthorizedError'
      } as SerializedError);
    }
    return await updateUser(payload, accessToken);
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: { email: string }) => await requestPasswordReset(payload.email)
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (payload: { password: string, confirmationCode: string }) => await resetPassword(payload)
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as TRootState;
    const {refreshToken} = state.auth;
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token found');
    }
    await logoutUser(refreshToken);
    refreshTokenPersistence.drop();
    thunkAPI.dispatch(closePrivateOrdersChannel());
  }
);
