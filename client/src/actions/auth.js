import { login, signup, fetchToken } from '../util/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginRequest = { type: LOGIN_REQUEST };
const loginSuccess = token => ({ type: LOGIN_SUCCESS, token });
const loginError = error => ({ type: LOGIN_ERROR, error });

export const attemptLogin = (username, password) => async dispatch => {
  dispatch(loginRequest);
  try {
    const token = await login(username, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const signupRequest = { type: SIGNUP_REQUEST };
const signupSuccess = token => ({ type: SIGNUP_SUCCESS, token });
const signupError = error => ({ type: SIGNUP_ERROR, error });

export const attemptSignup = (user) => async dispatch => {
  dispatch(signupRequest);
  try {
    const token = await signup(user.username, user.password, user.email, user.studentNo, user.major);
    dispatch(signupSuccess(token));
  } catch (error) {
    dispatch(signupError(error));
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });

export const TOKENUPDATE_REQUEST = 'TOKENUPDATE_REQUEST';
export const TOKENUPDATE_SUCCESS = 'TOKENUPDATE_SUCCESS';
export const TOKENUPDATE_ERROR = 'TOKENUPDATE_ERROR';

const tokenUpdateRequest = { type: TOKENUPDATE_REQUEST };
const tokenUpdateSuccess = token => ({ type: TOKENUPDATE_SUCCESS, token });
const tokenUpdateError = error => ({ type: TOKENUPDATE_ERROR, error });

export const getNewToken = () => async (dispatch, getState) => {
  dispatch(tokenUpdateRequest);
  try {
    const { token } = getState().auth;
    const updatedToken = await fetchToken(token);
    dispatch(tokenUpdateSuccess(updatedToken));
  } catch (error) {
    dispatch(tokenUpdateError(error));
  }
};

