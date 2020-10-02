import jwtDecode from 'jwt-decode';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
  TOKENUPDATE_REQUEST,
  TOKENUPDATE_SUCCESS,
  TOKENUPDATE_ERROR
} from '../actions/auth';

import { USER_DELETE_SUCCESS } from '../actions/user';

const token = localStorage.getItem('token');
const user = token && jwtDecode(token).user;

const initialState = {
  ...(token && { token }),
  ...(user && { user }),
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case TOKENUPDATE_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case TOKENUPDATE_SUCCESS:
      const user = jwtDecode(action.token).user;
      return {
        ...state,
        loading: false,
        token: action.token,
        user,
        authenticated: null
      };
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
    case TOKENUPDATE_ERROR:
      return { ...state, loading: false };

    case USER_DELETE_SUCCESS:
    case LOGOUT:
      return { ...state, token: null, user: null };

    default:
      return state;
  }
};
