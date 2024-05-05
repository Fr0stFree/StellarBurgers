import {createSlice} from '@reduxjs/toolkit';

import {type RequestStatus} from "../types.ts";
import {type IUser} from "./types.ts";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword, logoutUser, startSession, updateUser
} from "./thunks.ts";

interface authState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loginRequestStatus: RequestStatus;
  registerRequestStatus: RequestStatus;
  updateUserRequestStatus: RequestStatus;
  logoutRequestStatus: RequestStatus;
  forgotPasswordRequestStatus: RequestStatus;
  resetPasswordRequestStatus: RequestStatus;
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRequestStatus(state, action: {
      payload: 'register' | 'login' | 'logout' | 'forgotPassword' | 'resetPassword'| 'updateUser'
    }) {
      state[`${action.payload}RequestStatus`] = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSession.pending, (state) => {
        state.loginRequestStatus = 'pending';
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.loginRequestStatus = 'succeeded';
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(startSession.rejected, (state) => {
        state.loginRequestStatus = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.registerRequestStatus = 'pending';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerRequestStatus = 'succeeded';
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerRequestStatus = 'failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.loginRequestStatus = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginRequestStatus = 'succeeded';
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginRequestStatus = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserRequestStatus = 'pending';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserRequestStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateUserRequestStatus = 'failed';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordRequestStatus = 'pending';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordRequestStatus = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.forgotPasswordRequestStatus = 'failed';
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequestStatus = 'pending';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordRequestStatus = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state) => {
        state.resetPasswordRequestStatus = 'failed';
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutRequestStatus = 'pending';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutRequestStatus = 'succeeded';
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.logoutRequestStatus = 'failed';
      });
  }
});

export const {
  resetRequestStatus,
} = authSlice.actions;

export default authSlice.reducer;
