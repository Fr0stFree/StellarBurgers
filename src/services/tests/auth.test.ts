import * as axios from "axios";
import {OK} from "http-status";

import {refreshTokenPersistence as refreshTokenPersistenceMock} from "../auth/persistence";
import authReducer, {IAuthState, initialState, resetRequestStatus,} from '../auth/slices';
import {TRootState} from "../../hooks";
import {generateCredentials, generateInitialState, generateUser} from "./utils";
import {
  forgotPasswordThunk,
  loginUserThunk,
  logoutUserThunk,
  refreshAccessTokenThunk,
  registerUserThunk,
  resetPasswordThunk
} from "../auth/thunks";

jest.mock('axios');
jest.mock('../auth/persistence');

describe('should handle auth slice', () => {
  let preloadedState = {} as IAuthState;
  beforeEach(() => {
    preloadedState = JSON.parse(JSON.stringify(initialState));
  });

  it('should return an initial state', () => {
    expect(authReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle request status reset', () => {
    preloadedState.registerRequestStatus = 'failed';
    expect(authReducer(preloadedState, resetRequestStatus('register'))).toEqual({
      ...initialState,
      registerRequestStatus: 'idle',
    });
  });
});

describe('should handle get auth thunks', () => {
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

  it('should handle user registration successfully', async () => {
    const expectedClient = {...generateUser(), ...generateCredentials()}
    refreshTokenPersistenceMock.save.mockImplementation(() => {
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: {success: true, ...expectedClient},
      status: OK
    }));

    const thunk = registerUserThunk({password: 'pass', email: expectedClient.email, name: expectedClient.name});
    const result = await thunk(dispatch, getState, undefined);

    expect(result.payload).toMatchObject(expectedClient);
    expect(result.type).toBe('auth/register/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
    expect(refreshTokenPersistenceMock.save).toHaveBeenCalledWith(expectedClient.refreshToken);
  });

  it('should handle user login successfully', async () => {
    const expectedClient = {...generateUser(), ...generateCredentials()}
    refreshTokenPersistenceMock.save.mockImplementation(() => {
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: {success: true, ...expectedClient},
      status: OK
    }));

    const thunk = loginUserThunk({password: 'pass', email: expectedClient.email});
    const result = await thunk(dispatch, getState, undefined);

    expect(result.payload).toMatchObject(expectedClient);
    expect(result.type).toBe('auth/login/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
    expect(refreshTokenPersistenceMock.save).toHaveBeenCalledWith(expectedClient.refreshToken);
  });

  it('should handle user logout successfully', async () => {
    state.auth.refreshToken = generateCredentials().refreshToken;
    refreshTokenPersistenceMock.drop.mockImplementation(() => {
    });
    axios.post.mockImplementation(() => Promise.resolve({
      status: OK,
      data: {success: true}
    }));

    const result = await logoutUserThunk()(dispatch, getState, undefined);

    expect(result.type).toBe('auth/logout/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).toHaveBeenCalled();
    expect(refreshTokenPersistenceMock.drop).toHaveBeenCalled();
  });

  it('should handle refresh user access token', async () => {
    const expectedCredentials = generateCredentials();
    state.auth.refreshToken = generateCredentials().refreshToken;
    refreshTokenPersistenceMock.save.mockImplementation(() => {
    });
    axios.post.mockImplementation(() => Promise.resolve({
      status: OK,
      data: {success: true, ...expectedCredentials}
    }));

    const result = await refreshAccessTokenThunk()(dispatch, getState, undefined);

    expect(result.payload).toEqual(expectedCredentials);
    expect(result.type).toBe('auth/refreshToken/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).toHaveBeenCalled();
    expect(refreshTokenPersistenceMock.save).toHaveBeenCalledWith(expectedCredentials.refreshToken);
  });

  it('should handle forgot password procedure', async () => {
    const expectedUser = generateUser();
    axios.post.mockImplementation(() => Promise.resolve({
      status: OK,
      data: {success: true}
    }));

    const result = await forgotPasswordThunk({email: expectedUser.email})(dispatch, getState, undefined);

    expect(result.type).toBe('auth/forgotPassword/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
  });

  it('should handle reset password procedure', async () => {
    axios.post.mockImplementation(() => Promise.resolve({
      status: OK,
      data: {success: true}
    }));

    const thunk = resetPasswordThunk({password: 'pass', confirmationCode: '123'});
    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toBe('auth/resetPassword/fulfilled');
    expect(axios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(getState).not.toHaveBeenCalled();
  });
});