import {createAsyncThunk} from "@reduxjs/toolkit";

import backendApi from "../api/api.ts";
import {dropRefreshToken, loadRefreshToken, saveRefreshToken} from "./persistence.ts";
import {RootState} from "../store.ts";

export const startSession = createAsyncThunk(
  'auth/startSession',
  async (_, thunkAPI) => {
    let refreshToken;
    try {
      refreshToken = loadRefreshToken();
        // TODO: It would be better to throw something more specific than just a string
      if (!refreshToken) {
        return thunkAPI.rejectWithValue('No refresh token found');
      }
      const { accessToken, refreshToken: newRefreshToken } = await backendApi.updateAccessToken(refreshToken);
      const user = await backendApi.getUser(accessToken);
      saveRefreshToken(newRefreshToken);
      return { user, accessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      refreshToken && dropRefreshToken();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: {email: string, password: string, name: string}, thunkAPI) => {
    try {
      const client = await backendApi.register(payload);
      saveRefreshToken(client.refreshToken);
      return client
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: {email: string, password: string}, thunkAPI) => {
    try {
      const client = await backendApi.login(payload);
      saveRefreshToken(client.refreshToken);
      return client;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: {email?: string, name?: string, password?: string}, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { accessToken } = state.auth;
      if (!accessToken) {
        return thunkAPI.rejectWithValue('No access token found');
      }
      return await backendApi.updateUser(payload, accessToken);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: {email: string}, thunkAPI) => {
    try {
      return await backendApi.requestPasswordReset(payload.email);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: {password: string, confirmationCode: string}, thunkAPI) => {
    try {
      return await backendApi.resetPassword(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const { refreshToken } = state.auth;
      if (!refreshToken) {
        return thunkAPI.rejectWithValue('No refresh token found');
      }
      await backendApi.logout(refreshToken);
      dropRefreshToken();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
