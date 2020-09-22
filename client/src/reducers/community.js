import {
    FETCH_COMMUNITY_REQUEST,
    FETCH_COMMUNITY_SUCCESS,
    FETCH_COMMUNITY_ERROR,
    FETCH_COMMUNITIES_REQUEST,
    FETCH_COMMUNITIES_SUCCESS,
    FETCH_COMMUNITIES_ERROR,
    MEMBER_COMMUNITY_REQUEST,
    MEMBER_COMMUNITY_SUCCESS,
    MEMBER_COMMUNITY_ERROR

} from '../actions/community';

const initialState = { isFetching: false, items: [] };

const updateItems = (joined, community, items) => {
    if (!joined) return items.filter(c => c.id !== community.id);

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
        case FETCH_COMMUNITIES_ERROR:
            return { ...state, isFetching: false };

        case FETCH_COMMUNITY_REQUEST:
            return { ...state, isFetching: true };
        case FETCH_COMMUNITY_SUCCESS:
            return { ...state, isFetching: false, community: action.community };
        case FETCH_COMMUNITY_ERROR:
            return { ...state, isFetching: false };

        case MEMBER_COMMUNITY_REQUEST:
            return { ...state, isFetching: true };
        case MEMBER_COMMUNITY_SUCCESS:
            items = updateItems(action.joined, action.community, state.items);
            return {
                ...state,
                isFetching: false,
                community: action.community,
                items
            };
        case MEMBER_COMMUNITY_ERROR:
            return { ...state, isFetching: false }
        default:
            return state;
    }
};