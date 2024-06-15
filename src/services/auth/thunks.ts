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
import {type TRootState} from "../../hooks.ts";
import {type IUserWithPassword} from "./types.ts";

export const reviewUserThunk = createAsyncThunk(
  'auth/startSession',
  async (_, thunkAPI) => {
    const refreshToken = refreshTokenPersistence.load();
    if (!refreshToken) {
      return thunkAPI.fulfillWithValue({user: null, accessToken: null, refreshToken: null});
    }
    const {accessToken, refreshToken: newRefreshToken} = await updateAccessToken(refreshToken);
    const user = await getUser(accessToken);
    refreshTokenPersistence.save(newRefreshToken);
    return {user, accessToken, refreshToken: newRefreshToken};
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (payload: IUserWithPassword, thunkAPI) => {
    const client = await registerUser(payload);
    refreshTokenPersistence.save(client.refreshToken);
    return client;
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (payload: Omit<IUserWithPassword, 'name'>, thunkAPI) => {
    const client = await loginUser(payload);
    refreshTokenPersistence.save(client.refreshToken);
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
  }
);
