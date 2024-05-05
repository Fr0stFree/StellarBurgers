import {createAsyncThunk} from "@reduxjs/toolkit";

import backendApi from "../api/api.ts";
import {dropRefreshToken, loadRefreshToken, saveRefreshToken} from "./persistence.ts";
import {RootState} from "../store.ts";

export const startSession = createAsyncThunk(
  'auth/startSession',
  async (_, thunkAPI) => {
    const refreshToken = loadRefreshToken();
    if (!refreshToken) {
      return thunkAPI.fulfillWithValue({ user: null, accessToken: null, refreshToken: null })
    }
    const { accessToken, refreshToken: newRefreshToken } = await backendApi.updateAccessToken(refreshToken);
    const user = await backendApi.getUser(accessToken);
    saveRefreshToken(newRefreshToken);
    return { user, accessToken, refreshToken: newRefreshToken };
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: {email: string, password: string, name: string}) => {
    const client = await backendApi.register(payload);
    saveRefreshToken(client.refreshToken);
    return client;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: {email: string, password: string}) => {
    const client = await backendApi.login(payload);
    saveRefreshToken(client.refreshToken);
    return client;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: {email?: string, name?: string, password?: string}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { accessToken } = state.auth;
    if (!accessToken) {
      return thunkAPI.rejectWithValue('No access token found');
    }
    return await backendApi.updateUser(payload, accessToken);
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: {email: string}) => await backendApi.requestPasswordReset(payload.email)
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: {password: string, confirmationCode: string}) => await backendApi.resetPassword(payload)
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { refreshToken } = state.auth;
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token found');
    }
    await backendApi.logout(refreshToken);
    dropRefreshToken();
  }
);
