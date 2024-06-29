import {createSlice} from '@reduxjs/toolkit';

import {type TRequestStatus} from "../common/types";
import {type IUser} from "./types";
import {
  forgotPasswordThunk,
  loginUserThunk,
  logoutUserThunk,
  refreshAccessTokenThunk,
  registerUserThunk,
  resetPasswordThunk,
  reviewUserThunk,
  updateUserThunk,
} from "./thunks";
import {refreshTokenPersistence} from "./persistence";

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loginRequestStatus: TRequestStatus;
  registerRequestStatus: TRequestStatus;
  updateUserRequestStatus: TRequestStatus;
  logoutRequestStatus: TRequestStatus;
  forgotPasswordRequestStatus: TRequestStatus;
  resetPasswordRequestStatus: TRequestStatus;
  startSessionRequestStatus: TRequestStatus;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loginRequestStatus: 'idle',
  registerRequestStatus: 'idle',
  updateUserRequestStatus: 'idle',
  logoutRequestStatus: 'idle',
  forgotPasswordRequestStatus: 'idle',
  resetPasswordRequestStatus: 'idle',
  startSessionRequestStatus: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRequestStatus(state, action: {
      payload: 'register' | 'login' | 'logout' | 'forgotPassword' | 'resetPassword' | 'updateUser' | 'startSession';
    }) {
      state[`${action.payload}RequestStatus`] = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reviewUserThunk.pending, (state) => {
        state.startSessionRequestStatus = 'pending';
      })
      .addCase(reviewUserThunk.fulfilled, (state, action) => {
        state.startSessionRequestStatus = 'succeeded';
        const {user, accessToken, refreshToken} = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(reviewUserThunk.rejected, (state) => {
        state.startSessionRequestStatus = 'failed';
        refreshTokenPersistence.drop(); // TODO: is it okay to put this here? Looks like a side effect
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.registerRequestStatus = 'pending';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.registerRequestStatus = 'succeeded';
        const {user, accessToken, refreshToken} = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.registerRequestStatus = 'failed';
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loginRequestStatus = 'pending';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loginRequestStatus = 'succeeded';
        const {user, accessToken, refreshToken} = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loginRequestStatus = 'failed';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUserRequestStatus = 'pending';
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.updateUserRequestStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.updateUserRequestStatus = 'failed';
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.forgotPasswordRequestStatus = 'pending';
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.forgotPasswordRequestStatus = 'succeeded';
      })
      .addCase(forgotPasswordThunk.rejected, (state) => {
        state.forgotPasswordRequestStatus = 'failed';
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.resetPasswordRequestStatus = 'pending';
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.resetPasswordRequestStatus = 'succeeded';
      })
      .addCase(resetPasswordThunk.rejected, (state) => {
        state.resetPasswordRequestStatus = 'failed';
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.logoutRequestStatus = 'pending';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.logoutRequestStatus = 'succeeded';
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.logoutRequestStatus = 'failed';
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state, {payload}) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(refreshAccessTokenThunk.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  }
});

export const {
  resetRequestStatus,
} = authSlice.actions;

export default authSlice.reducer;
