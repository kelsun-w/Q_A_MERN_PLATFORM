import { LOGIN_SUCCESS, SIGNUP_SUCCESS, TOKENUPDATE_SUCCESS, LOGOUT } from '../actions/auth';
import { USER_DELETE_SUCCESS } from '../actions/user';

export default () => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS || action.type === TOKENUPDATE_SUCCESS) {
    localStorage.setItem('token', action.token);
  } else if (action.type === LOGOUT || action.type === USER_DELETE_SUCCESS) {
    localStorage.removeItem('token');
  }
  next(action);
};
