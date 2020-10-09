import {
    FETCH_COMMUNITY_REQUEST,
    FETCH_COMMUNITY_SUCCESS,
    FETCH_COMMUNITY_ERROR,
    FETCH_COMMUNITIES_REQUEST,
    FETCH_COMMUNITIES_SUCCESS,
    FETCH_COMMUNITIES_ERROR,
    UPDATE_COMMUNITY_REQUEST,
    UPDATE_COMMUNITY_SUCCESS,
    UPDATE_COMMUNITY_ERROR,
    MEMBER_COMMUNITY_REQUEST,
    MEMBER_COMMUNITY_SUCCESS,
    MEMBER_COMMUNITY_ERROR,
    ASSIGN_MOD_REQUEST,
    ASSIGN_MOD_SUCCESS,
    ASSIGN_MOD_ERROR,
    ADD_RULE_REQUEST,
    ADD_RULE_SUCCESS,
    ADD_RULE_ERROR,
    REMOVE_RULE_REQUEST,
    REMOVE_RULE_SUCCESS,
    REMOVE_RULE_ERROR,
    COMMUNITY_IMAGE_UPLOAD_REQUEST,
    COMMUNITY_IMAGE_UPLOAD_SUCCESS,
    COMMUNITY_IMAGE_UPLOAD_ERROR,
    ADD_BAN_REQUEST,
    ADD_BAN_SUCCESS,
    ADD_BAN_ERROR,
    REMOVE_BAN_REQUEST,
    REMOVE_BAN_SUCCESS,
    REMOVE_BAN_ERROR,
} from '../actions/community';

const initialState = { isFetching: false, isUploading: false, items: [] };

const updateItems = (success, community, items) => {
    if (!success) return items.filter(c => c.id !== community.id);

    let isNew = true;
    items.map(i => {
        if (i.id === community.id) {
            isNew = false;
            return community;
        } else {
            return i;
        }
    });
    if (isNew) items.push(community);
    return items;
}

let items;
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMUNITIES_REQUEST:
            return { ...state, isFetching: true, community: null };
        case FETCH_COMMUNITIES_SUCCESS:
            return { ...state, isFetching: false, items: action.communities };

        case COMMUNITY_IMAGE_UPLOAD_REQUEST:
            return { ...state, isUploading: true };

        case FETCH_COMMUNITY_REQUEST:
        case MEMBER_COMMUNITY_REQUEST:
        case UPDATE_COMMUNITY_REQUEST:
        case ASSIGN_MOD_REQUEST:
        case ADD_RULE_REQUEST:
        case REMOVE_RULE_REQUEST:
        case ADD_BAN_REQUEST:
        case REMOVE_BAN_REQUEST:
            return { ...state, isFetching: true };

        case MEMBER_COMMUNITY_SUCCESS:
        case ASSIGN_MOD_SUCCESS:
            items = updateItems(action.success, action.community, state.items);
            return {
                ...state,
                isFetching: false,
                community: action.community,
                items
            };

        case FETCH_COMMUNITY_SUCCESS:
        case UPDATE_COMMUNITY_SUCCESS:
            return { ...state, isFetching: false, community: action.community };

        case FETCH_COMMUNITY_ERROR:
        case FETCH_COMMUNITIES_ERROR:
        case UPDATE_COMMUNITY_ERROR:
        case MEMBER_COMMUNITY_ERROR:
        case ASSIGN_MOD_ERROR:
        case ADD_RULE_SUCCESS:
        case ADD_RULE_ERROR:
        case REMOVE_RULE_SUCCESS:
        case REMOVE_RULE_ERROR:
        case ADD_BAN_SUCCESS:
        case ADD_BAN_ERROR:
        case REMOVE_BAN_SUCCESS:
        case REMOVE_BAN_ERROR:
            return { ...state, isFetching: false };

        case COMMUNITY_IMAGE_UPLOAD_SUCCESS:
        case COMMUNITY_IMAGE_UPLOAD_ERROR:
            return { ...state, isUploading: false };

        default:
            return state;
    }
};