import {
  getPosts,
  getProfile,
  getPost,
  searchPosts,
  createPost,
  deletePost,
  createComment,
  createSubComment,
  deleteComment,
  deleteSubComment,
  castVote,
  castCommentVote
} from '../util/api';

import {
  getNewToken
} from './auth';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

const fetchPostsRequest = { type: FETCH_POSTS_REQUEST };
const fetchPostsSuccess = posts => ({ type: FETCH_POSTS_SUCCESS, posts });
const fetchPostsError = error => ({ type: FETCH_POSTS_ERROR, error });

export const fetchPosts = (category = '') => async dispatch => {
  dispatch(fetchPostsRequest);
  try {
    const posts = await getPosts(category);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

export const fetchProfile = username => async dispatch => {
  dispatch(fetchPostsRequest);
  try {
    const posts = await getProfile(username);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';

const fetchPostRequest = { type: FETCH_POST_REQUEST };
const fetchPostSuccess = post => ({ type: FETCH_POST_SUCCESS, post });
const fetchPostError = error => ({ type: FETCH_POST_ERROR, error });

export const fetchPost = id => async dispatch => {
  dispatch(fetchPostRequest);
  try {
    const post = await getPost(id);
    dispatch(fetchPostSuccess(post));
  } catch (error) {
    dispatch(fetchPostError(error));
  }
};

export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_ERROR = 'SEARCH_POSTS_ERROR';

const searchPostsRequest = { type: SEARCH_POSTS_REQUEST };
const searchPostsSuccess = posts => ({ type: SEARCH_POSTS_SUCCESS, posts });
const searchPostsError = error => ({ type: SEARCH_POSTS_ERROR, error });

export const attemptSearchPosts = (query = '') => async dispatch => {
  dispatch(searchPostsRequest);
  try {
    const result = await searchPosts(query);
    dispatch(searchPostsSuccess(result.list));
  } catch (error) {
    dispatch(searchPostsError(error));
  }
};

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

const createPostRequest = { type: CREATE_POST_REQUEST };
const createPostSuccess = post => ({ type: CREATE_POST_SUCCESS, post });
const createPostError = error => ({ type: CREATE_POST_ERROR, error });

export const attemptCreatePost = post => async (dispatch, getState) => {
  dispatch(createPostRequest);
  try {
    const { token } = getState().auth;
    const newPost = await createPost(post, token);
    dispatch(createPostSuccess(newPost));
  } catch (error) {
    dispatch(createPostError(error));
  }
};

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

const deletePostRequest = { type: DELETE_POST_REQUEST };
const deletePostSuccess = post => ({ type: DELETE_POST_SUCCESS, post });
const deletePostError = error => ({ type: DELETE_POST_ERROR, error });

export const attemptDeletePost = postid => async (dispatch, getState) => {

  dispatch(deletePostRequest);
  try {
    const id = postid || getState().posts.post.id;
    const { token } = getState().auth;
    await deletePost(id, token);
    dispatch(deletePostSuccess(id));
  } catch (error) {
    dispatch(deletePostError(error));
  }
};

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

const createCommentRequest = { type: CREATE_COMMENT_REQUEST };
const createCommentSuccess = post => ({ type: CREATE_COMMENT_SUCCESS, post });
const createCommentError = error => ({ type: CREATE_COMMENT_ERROR, error });

export const attemptCreateComment = comment => async (dispatch, getState) => {
  dispatch(createCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const json = await createComment(post, comment, token);
    dispatch(createCommentSuccess(json));
  } catch (error) {
    dispatch(createCommentError(error));
  }
};

export const CREATE_SUBCOMMENT_REQUEST = 'CREATE_SUBCOMMENT_REQUEST';
export const CREATE_SUBCOMMENT_SUCCESS = 'CREATE_SUBCOMMENT_SUCCESS';
export const CREATE_SUBCOMMENT_ERROR = 'CREATE_SUBCOMMENT_ERROR';

const createSubCommentRequest = { type: CREATE_SUBCOMMENT_REQUEST };
const createSubCommentSuccess = post => ({ type: CREATE_SUBCOMMENT_SUCCESS, post });
const createSubCommentError = error => ({ type: CREATE_SUBCOMMENT_ERROR, error });

export const attemptCreateSubComment = (parentCommentId, commentBody) => async (dispatch, getState) => {
  dispatch(createSubCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const result = await createSubComment(post, parentCommentId, commentBody, token);
    dispatch(createSubCommentSuccess(result));
  } catch (error) {
    dispatch(createSubCommentError(error));
  }
};

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

const deleteCommentRequest = { type: DELETE_COMMENT_REQUEST };
const deleteCommentSuccess = post => ({ type: DELETE_COMMENT_SUCCESS, post });
const deleteCommentError = error => ({ type: DELETE_COMMENT_ERROR, error });

export const attemptDeleteComment = comment => async (dispatch, getState) => {
  dispatch(deleteCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const json = await deleteComment(post, comment, token);
    dispatch(deleteCommentSuccess(json));
  } catch (error) {
    dispatch(deleteCommentError(error));
  }
};

export const DELETE_SUBCOMMENT_REQUEST = 'DELETE_SUBCOMMENT_REQUEST';
export const DELETE_SUBCOMMENT_SUCCESS = 'DELETE_SUBCOMMENT_SUCCESS';
export const DELETE_SUBCOMMENT_ERROR = 'DELETE_SUBCOMMENT_ERROR';

const deleteSubCommentRequest = { type: DELETE_SUBCOMMENT_REQUEST };
const deleteSubCommentSuccess = post => ({ type: DELETE_SUBCOMMENT_SUCCESS, post });
const deleteSubCommentError = error => ({ type: DELETE_SUBCOMMENT_ERROR, error });

export const attemptDeleteSubComment = (parentId, childId) => async (dispatch, getState) => {
  dispatch(deleteSubCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const json = await deleteSubComment(post, parentId, childId, token);
    dispatch(deleteSubCommentSuccess(json));
  } catch (error) {
    dispatch(deleteSubCommentError(error));
  }
};

export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_ERROR = 'VOTE_ERROR';

const voteRequest = { type: VOTE_REQUEST };
const voteSuccess = post => ({ type: VOTE_SUCCESS, post });
const voteError = error => ({ type: VOTE_ERROR, error });

export const attemptVote = (id, vote) => async (dispatch, getState) => {
  dispatch(voteRequest);
  try {
    const { token } = getState().auth;
    const post = await castVote(id, vote, token);
    dispatch(voteSuccess(post));
    dispatch(getNewToken());
  } catch (error) {
    dispatch(voteError(error));
  }
};

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_ERROR = 'VOTE_COMMENT_ERROR';

const voteCommentRequest = { type: VOTE_COMMENT_REQUEST };
const voteCommentSuccess = post => ({ type: VOTE_COMMENT_SUCCESS, post });
const voteCommentError = error => ({ type: VOTE_COMMENT_ERROR, error });

export const attemptCommentVote = (postId, commentId, vote) => async (dispatch, getState) => {
  dispatch(voteCommentRequest);
  try {
    const { token } = getState().auth;
    const result = await castCommentVote(postId, commentId, vote, token);
    dispatch(voteCommentSuccess(result));
    dispatch(getNewToken());
  } catch (error) {
    dispatch(voteCommentError(error));
  }
};