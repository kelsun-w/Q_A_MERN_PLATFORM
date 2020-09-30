import {
  FETCH_COMMUNITIES_SUCCESS,
  FETCH_COMMUNITIES_ERROR,
  FETCH_COMMUNITY_SUCCESS,
  FETCH_COMMUNITY_ERROR,
  MEMBER_COMMUNITY_SUCCESS,
  MEMBER_COMMUNITY_ERROR
} from '../actions/community';

import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  VOTE_SUCCESS,
  VOTE_ERROR
} from '../actions/posts';

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  TOKENUPDATE_SUCCESS,
  TOKENUPDATE_ERROR,
  LOGOUT
} from '../actions/auth';

import {
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR
} from '../actions/user';

import { hideErrorClearTimeout, showErrorWithTimeout } from '../actions/error';

export default store => next => action => {
  next(action);
  switch (action.type) {
    case FETCH_COMMUNITIES_SUCCESS:
    case FETCH_COMMUNITY_SUCCESS:
    case MEMBER_COMMUNITY_SUCCESS:
    case FETCH_POSTS_SUCCESS:
    case FETCH_POST_SUCCESS:
    case CREATE_POST_SUCCESS:
    case DELETE_POST_SUCCESS:
    case CREATE_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS:
    case VOTE_SUCCESS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case TOKENUPDATE_SUCCESS:
    case USER_UPDATE_SUCCESS:
    case IMAGE_UPLOAD_SUCCESS:
    case LOGOUT:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    case FETCH_COMMUNITIES_ERROR:
    case FETCH_COMMUNITY_ERROR:
    case MEMBER_COMMUNITY_ERROR:
    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
    case CREATE_POST_ERROR:
    case DELETE_POST_ERROR:
    case CREATE_COMMENT_ERROR:
    case DELETE_COMMENT_ERROR:
    case VOTE_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case TOKENUPDATE_ERROR:
    case USER_UPDATE_ERROR:
    case IMAGE_UPLOAD_ERROR:
      store.dispatch(showErrorWithTimeout(action.error));
      break;

    default:
      break;
  }
};
