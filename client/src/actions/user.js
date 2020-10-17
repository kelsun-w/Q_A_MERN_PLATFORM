import { getNewToken } from './auth';
import {
    fetchUser,
    updateUser,
    user_UploadImage,
    user_SavePost,
    user_GetSavedPosts,
    deleteUser,
    searchUsers
} from '../util/api';

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_ERROR = 'USER_GET_ERROR';

const getUserRequest = { type: USER_GET_REQUEST };
const getUserSuccess = user => ({ type: USER_GET_SUCCESS, user });
const getUserError = error => ({ type: USER_GET_ERROR, error });

export const getUser = (userid = '') => async (dispatch, getState) => {
    dispatch(getUserRequest);
    try {
        const { token } = getState().auth;
        const result = await fetchUser(userid, token);
        dispatch(getUserSuccess(result.user));
    } catch (error) {
        dispatch(getUserError(error));
    }
};

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_ERROR = 'SEARCH_USERS_ERROR';

const searchUsersRequest = { type: SEARCH_USERS_REQUEST };
const searchUsersSuccess = users => ({ type: SEARCH_USERS_SUCCESS, users });
const searchUsersError = error => ({ type: SEARCH_USERS_ERROR, error });

export const attemptSearchUsers = (query = '') => async dispatch => {
  dispatch(searchUsersRequest);
  try {
    const result = await searchUsers(query);
    dispatch(searchUsersSuccess(result.list));
  } catch (error) {
    dispatch(searchUsersError(error));
  }
};

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

const userUpdateRequest = { type: USER_UPDATE_REQUEST };
const userUpdateSuccess = { type: USER_UPDATE_SUCCESS };
const userUpdateError = error => ({ type: USER_UPDATE_ERROR, error });

export const userUpdate = (update = {}) => async (dispatch, getState) => {
    dispatch(userUpdateRequest);
    try {
        const { token } = getState().auth;
        const user = await updateUser(update, token);
        dispatch(userUpdateSuccess);
        dispatch(getNewToken());
    } catch (error) {
        dispatch(userUpdateError(error));
    }
};

export const USER_SAVEPOST_REQUEST = 'USER_SAVEPOST_REQUEST';
export const USER_SAVEPOST_SUCCESS = 'USER_SAVEPOST_SUCCESS';
export const USER_SAVEPOST_ERROR = 'USER_SAVEPOST_ERROR';

const userSavePostRequest = { type: USER_SAVEPOST_REQUEST };
const userSavePostSuccess = { type: USER_SAVEPOST_SUCCESS };
const userSavePostError = error => ({ type: USER_SAVEPOST_ERROR, error });

export const userSavePost = (postId = '') => async (dispatch, getState) => {
    dispatch(userSavePostRequest);
    try {
        const { token } = getState().auth;
        const result = await user_SavePost(postId, token);
        dispatch(userSavePostSuccess);
        dispatch(getNewToken());
    } catch (error) {
        dispatch(userSavePostError(error));
    }
};

export const USER_GETSAVEDPOSTS_REQUEST = 'USER_GETSAVEDPOSTS_REQUEST';
export const USER_GETSAVEDPOSTS_SUCCESS = 'USER_GETSAVEDPOSTS_SUCCESS';
export const USER_GETSAVEDPOSTS_ERROR = 'USER_GETSAVEDPOSTS_ERROR';

const userGetSavedPostsRequest = { type: USER_GETSAVEDPOSTS_REQUEST };
const userGetSavedPostsSuccess = posts => ({ type: USER_GETSAVEDPOSTS_SUCCESS, posts });
const userGetSavedPostsError = error => ({ type: USER_GETSAVEDPOSTS_ERROR, error });

export const userGetSavedPosts = (userId = '') => async (dispatch, getState) => {
    dispatch(userGetSavedPostsRequest);
    try {
        const { token } = getState().auth;
        const result = await user_GetSavedPosts(userId, token);
        dispatch(userGetSavedPostsSuccess(result.doc));
    } catch (error) {
        dispatch(userGetSavedPostsError(error));
    }
};

export const IMAGE_UPLOAD_REQUEST = 'IMAGE_UPLOAD_REQUEST';
export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';
export const IMAGE_UPLOAD_ERROR = 'IMAGE_UPLOAD_ERROR';

const imageUploadRequest = { type: IMAGE_UPLOAD_REQUEST };
const imageUploadSuccess = { type: IMAGE_UPLOAD_SUCCESS };
const imageUploadError = error => ({ type: IMAGE_UPLOAD_ERROR, error });

export const imageUpload = (image) => async (dispatch, getState) => {
    dispatch(imageUploadRequest);
    try {
        let formData = new FormData();
        formData.append('u_avatar', image, image.name);

        const { token } = getState().auth;
        const path = await user_UploadImage(formData, token);
        dispatch(imageUploadSuccess);
        dispatch(getNewToken());
        return true;
    } catch (error) {
        dispatch(imageUploadError(error));
        console.log(error);
        return false;
    }
};

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_ERROR = 'USER_DELETE_ERROR';

const userDeleteRequest = { type: USER_DELETE_REQUEST };
const userDeleteSuccess = { type: USER_DELETE_SUCCESS };
const userDeleteError = error => ({ type: USER_DELETE_ERROR, error });

export const userDelete = (password = '') => async (dispatch, getState) => {
    dispatch(userDeleteRequest);
    try {
        const { token, user } = getState().auth;
        const payload = { id: user.id, ...password };
        const res = await deleteUser(payload, token);
        dispatch(userDeleteSuccess);
    } catch (error) {
        dispatch(userDeleteError(error));
    }
};