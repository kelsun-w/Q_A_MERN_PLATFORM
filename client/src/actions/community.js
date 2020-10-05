import {
    getCommunities,
    getCommunity,
    sendJoinRequest,
    sendModRequest,
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
        return true;
    } catch (error) {
        dispatch(fetchCommunitiesError(error));
        return false;
    }
};

export const FETCH_COMMUNITY_REQUEST = 'FETCH_COMMUNITY_REQUEST';
export const FETCH_COMMUNITY_SUCCESS = 'FETCH_COMMUNITY_SUCCESS';
export const FETCH_COMMUNITY_ERROR = 'FETCH_COMMUNITY_ERROR';

const fetchCommunityRequest = { type: FETCH_COMMUNITY_REQUEST };
const fetchCommunitySuccess = community => ({ type: FETCH_COMMUNITY_SUCCESS, community });
const fetchCommunityError = error => ({ type: FETCH_COMMUNITY_ERROR, error });

export const fetchCommunity = (name = '') => async dispatch => {
    dispatch(fetchCommunityRequest);
    try {
        const community = await getCommunity(name);
        dispatch(fetchCommunitySuccess(community));
        return true;
    } catch (error) {
        dispatch(fetchCommunityError(error));
        return false;
    }
};

export const MEMBER_COMMUNITY_REQUEST = 'MEMBER_COMMUNITY_REQUEST';
export const MEMBER_COMMUNITY_SUCCESS = 'MEMBER_COMMUNITY_SUCCESS';
export const MEMBER_COMMUNITY_ERROR = 'MEMBER_COMMUNITY_ERROR';

const memberCommunityRequest = { type: MEMBER_COMMUNITY_REQUEST };
const memberCommunitySuccess = (success, community) => ({ type: MEMBER_COMMUNITY_SUCCESS, success, community });
const memberCommunityError = error => ({ type: MEMBER_COMMUNITY_ERROR, error });

export const joinCommunity = (name = '', userid = '') => async (dispatch, getState) => {
    dispatch(memberCommunityRequest);
    try {
        const { token } = getState().auth;
        const { success, user } = await sendJoinRequest(name, userid, token);
        const community = await getCommunity(name);
        dispatch(memberCommunitySuccess(success, community));
        return true;
    } catch (error) {
        dispatch(memberCommunityError(error));
        return false;
    }
};

export const ASSIGN_MOD_REQUEST = 'ASSIGN_MOD_REQUEST';
export const ASSIGN_MOD_SUCCESS = 'ASSIGN_MOD_SUCCESS';
export const ASSIGN_MOD_ERROR = 'ASSIGN_MOD_ERROR';

const assignModRequest = { type: ASSIGN_MOD_REQUEST };
const assignModSuccess = (success, community) => ({ type: ASSIGN_MOD_SUCCESS, success, community });
const assignModError = error => ({ type: ASSIGN_MOD_ERROR, error });

export const assignMod = (name = '', userid = '') => async (dispatch, getState) => {
    dispatch(assignModRequest);
    try {
        const { token } = getState().auth;
        const { success, community } = await sendModRequest(name, userid, token);
        dispatch(assignModSuccess(success, community));
        return true;
    } catch (error) {
        dispatch(assignModError(error));
        return false;
    }
};