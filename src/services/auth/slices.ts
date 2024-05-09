import {createSlice} from '@reduxjs/toolkit';

import {type TRequestStatus} from "../common/types.ts";
import {type IUser} from "./types.ts";
import {
  startSessionThunk,
  updateUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
} from "./thunks.ts";
import {refreshTokenPersistence} from "./persistence.ts";

interface authState {
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

const initialState: authState = {
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
      payload: 'register' | 'login' | 'logout' | 'forgotPassword' | 'resetPassword'| 'updateUser' | 'startSession';
    }) {
      state[`${action.payload}RequestStatus`] = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSessionThunk.pending, (state) => {
        state.startSessionRequestStatus = 'pending';
      })
      .addCase(startSessionThunk.fulfilled, (state, action) => {
        state.startSessionRequestStatus = 'succeeded';
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(startSessionThunk.rejected, (state) => {
        state.startSessionRequestStatus = 'failed';
        refreshTokenPersistence.drop(); // TODO: is it okay to put this here? Looks like a side effect
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.registerRequestStatus = 'pending';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.registerRequestStatus = 'succeeded';
        const { user, accessToken, refreshToken } = action.payload;
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
        const { user, accessToken, refreshToken } = action.payload;
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
      });
  }
});

export const {
  resetRequestStatus,
} = authSlice.actions;

export default authSlice.reducer;
