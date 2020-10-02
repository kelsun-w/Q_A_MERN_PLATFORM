import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR
} from '../actions/user';

const initialState = { updating: false, uploading: false };

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
        case USER_DELETE_REQUEST:
            return { ...state, updating: true };
        case IMAGE_UPLOAD_REQUEST:
            return { ...state, uploading: true };
        case USER_UPDATE_SUCCESS:
        case USER_DELETE_SUCCESS:
            return { ...state, updating: false };
        case IMAGE_UPLOAD_SUCCESS:
            return { ...state, uploading: false };
        case USER_UPDATE_ERROR:
        case USER_DELETE_ERROR:
            return { ...state, updating: false };
        case IMAGE_UPLOAD_ERROR:
            return { ...state, uploading: false };

        default:
            return state;
    }
};