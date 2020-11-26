import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  CREATE_SUBCOMMENT_REQUEST,
  CREATE_SUBCOMMENT_SUCCESS,
  CREATE_SUBCOMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  DELETE_SUBCOMMENT_REQUEST,
  DELETE_SUBCOMMENT_SUCCESS,
  DELETE_SUBCOMMENT_ERROR,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_ERROR,
  VOTE_COMMENT_REQUEST,
  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_ERROR
} from '../actions/posts';

const initialState = { isFetching: false, items: [] };

const updateItems = (updatedItem, items) =>
  items.map(i => (i.id === updatedItem.id ? updatedItem : i));

let items;
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, isFetching: true, post: null, newPost: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, isFetching: false, items: action.posts };
    case FETCH_POSTS_ERROR:
      return { ...state, isFetching: false };

    case FETCH_POST_REQUEST:
      return { ...state, isFetching: true, newPost: null };
    case FETCH_POST_SUCCESS:
      return { ...state, isFetching: false, post: action.post };
    case FETCH_POST_ERROR:
      return { ...state, isFetching: false };

    case SEARCH_POSTS_REQUEST:
      return { ...state, isFetching: true };
    case SEARCH_POSTS_SUCCESS:
      return { ...state, isFetching: false, items: action.posts };
    case SEARCH_POSTS_ERROR:
      return { ...state, isFetching: false };

    case CREATE_POST_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_POST_SUCCESS:
      return { ...state, isFetching: false, newPost: action.post };
    case CREATE_POST_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case DELETE_POST_REQUEST:
      return { ...state, isDeleting: true };
    case DELETE_POST_SUCCESS:
      items = state.items.filter(i => i.id !== action.post);
      return { ...state, isDeleting: false, items, post: null };
    case DELETE_POST_ERROR:
      return { ...state, isDeleting: false };

    case CREATE_COMMENT_REQUEST:
      return { ...state, isCommenting: true };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, isCommenting: false, post: action.post };
    case CREATE_COMMENT_ERROR:
      return { ...state, isCommenting: false };

    case CREATE_SUBCOMMENT_REQUEST:
      return { ...state, isCommenting: true };
    case CREATE_SUBCOMMENT_SUCCESS:
      return { ...state, isCommenting: false, post: action.post };
    case CREATE_SUBCOMMENT_ERROR:
      return { ...state, isCommenting: false };

    case DELETE_COMMENT_REQUEST:
      return { ...state, isDeleting: true };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, isDeleting: false, post: action.post };
    case DELETE_COMMENT_ERROR:
      return { ...state, isDeleting: false };


    case DELETE_SUBCOMMENT_REQUEST:
      return { ...state, isDeleting: true };
    case DELETE_SUBCOMMENT_SUCCESS:
      return { ...state, isDeleting: false, post: action.post };
    case DELETE_SUBCOMMENT_ERROR:
      return { ...state, isDeleting: false };

    case VOTE_REQUEST:
      return { ...state, isVoting: true };
    case VOTE_SUCCESS:
      items = updateItems(action.post, state.items);
      return {
        ...state,
        isVoting: false,
        items,
        post: action.post
      };
    case VOTE_ERROR:
      return { ...state, isVoting: false };

    case VOTE_COMMENT_REQUEST:
      return { ...state, isVoting: true };
    case VOTE_COMMENT_SUCCESS:
      items = updateItems(action.post, state.items);
      return {
        ...state,
        isVoting: false,
        items,
        post: action.post
      };
    case VOTE_COMMENT_ERROR:
      return { ...state, isVoting: false };

    default:
      return state;
  }
};
