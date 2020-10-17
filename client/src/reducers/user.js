import {
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_ERROR,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR,
    USER_SAVEPOST_REQUEST,
    USER_SAVEPOST_SUCCESS,
    USER_SAVEPOST_ERROR,
    USER_GETSAVEDPOSTS_REQUEST,
    USER_GETSAVEDPOSTS_SUCCESS,
    USER_GETSAVEDPOSTS_ERROR,
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_ERROR
} from '../actions/user';

const initialState = { updating: false, uploading: false };

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
        case USER_SAVEPOST_REQUEST:
        case USER_DELETE_REQUEST:
            return { ...state, updating: true };

        case USER_GET_REQUEST:
            return { ...state, fetching: true };
        case USER_GET_SUCCESS:
            return { ...state, fetching: false, user: action.user };
        case USER_GET_ERROR:
            return { ...state, fetching: false };

        case SEARCH_USERS_REQUEST:
            return { ...state, fetching: true };
        case SEARCH_USERS_SUCCESS:
            return { ...state, fetching: false, searchList: action.users };
        case SEARCH_USERS_ERROR:
            return { ...state, fetching: false };

        case USER_UPDATE_SUCCESS:
        case USER_SAVEPOST_SUCCESS:
        case USER_DELETE_SUCCESS:
            return { ...state, updating: false };
        case USER_UPDATE_ERROR:
        case USER_SAVEPOST_ERROR:
        case USER_DELETE_ERROR:
            return { ...state, updating: false };

        case USER_GETSAVEDPOSTS_REQUEST:
            return { ...state, fetching: true, savedList: null };
        case USER_GETSAVEDPOSTS_SUCCESS:
            return { ...state, fetching: false, savedList: action.posts };
        case USER_GETSAVEDPOSTS_ERROR:
            return { ...state, fetching: false };

        case IMAGE_UPLOAD_REQUEST:
            return { ...state, uploading: true };
        case IMAGE_UPLOAD_SUCCESS:
            return { ...state, uploading: false };
        case IMAGE_UPLOAD_ERROR:
            return { ...state, uploading: false };

        default:
            return state;
    }
};