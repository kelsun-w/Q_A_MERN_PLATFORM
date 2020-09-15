import {
    getCommunities,
    getCommunity
} from '../util/api';

export const FETCH_COMMUNITIES_REQUEST = 'FETCH_COMMUNITIES_REQUEST';
export const FETCH_COMMUNITIES_SUCCESS = 'FETCH_COMMUNITIES_SUCCESS';
export const FETCH_COMMUNITIES_ERROR = 'FETCH_COMMUNITIES_ERROR';

const fetchCommunitiesRequest = { type: FETCH_COMMUNITIES_REQUEST };
const fetchCommunitiesSuccess = communities => ({ type: FETCH_COMMUNITIES_SUCCESS, communities });
const fetchCommunitiesError = error => ({ type: FETCH_COMMUNITIES_ERROR, error });

export const fetchCommunities = (user = '') => async dispatch => {
    dispatch(fetchCommunitiesRequest);
    try {
        const communities = await getCommunities(user);
        dispatch(fetchCommunitiesSuccess(communities));
    } catch (error) {
        dispatch(fetchCommunitiesError(error));
    }
};

export const FETCH_COMMUNITY_REQUEST = 'FETCH_COMMUNITY_REQUEST';
export const FETCH_COMMUNITY_SUCCESS = 'FETCH_COMMUNITY_SUCCESS';
export const FETCH_COMMUNITY_ERROR = 'FETCH_COMMUNITY_ERROR';

const fetchCommunityRequest = { type: FETCH_COMMUNITY_REQUEST };
const fetchCommunitySuccess = community => ({ type: FETCH_COMMUNITY_SUCCESS, community });
const fetchCommunityError = error => ({ type: FETCH_COMMUNITY_ERROR, error });

export const fetchCommunity = (id = '') => async dispatch => {
    dispatch(fetchCommunityRequest);
    try {
        const community = await getCommunity(id);
        dispatch(fetchCommunitySuccess(community));
    } catch (error) {
        dispatch(fetchCommunityError(error));
    }
};