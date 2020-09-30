import { getNewToken } from './auth';
import {
    updateUser,
    user_UploadImage
} from '../util/api';

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
        return false;
    }
};