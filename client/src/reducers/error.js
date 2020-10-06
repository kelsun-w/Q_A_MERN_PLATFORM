import {
  FETCH_COMMUNITIES_ERROR,
  FETCH_COMMUNITY_ERROR,
  MEMBER_COMMUNITY_ERROR,
  ASSIGN_MOD_ERROR, ADD_RULE_ERROR, REMOVE_RULE_ERROR
} from '../actions/community';

import {
  FETCH_POSTS_ERROR,
  FETCH_POST_ERROR,
  CREATE_POST_ERROR,
  DELETE_POST_ERROR,
  CREATE_COMMENT_ERROR,
  VOTE_ERROR
} from '../actions/posts';

import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  TOKENUPDATE_ERROR
} from '../actions/auth';

import {
  USER_UPDATE_ERROR,
  IMAGE_UPLOAD_ERROR,
  USER_DELETE_ERROR
} from '../actions/user';

import { HIDE_ERROR } from '../actions/error';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMUNITIES_ERROR:
    case FETCH_COMMUNITY_ERROR:
    case MEMBER_COMMUNITY_ERROR:
    case ASSIGN_MOD_ERROR:
    case ADD_RULE_ERROR:
    case REMOVE_RULE_ERROR:
    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
    case CREATE_POST_ERROR:
    case DELETE_POST_ERROR:
    case CREATE_COMMENT_ERROR:
    case VOTE_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case TOKENUPDATE_ERROR:
    case USER_UPDATE_ERROR:
    case IMAGE_UPLOAD_ERROR:
    case USER_DELETE_ERROR:
      return action.error;

    case HIDE_ERROR:
      return null;

    default:
      return state;
  }
};
