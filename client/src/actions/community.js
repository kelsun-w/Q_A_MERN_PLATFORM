import {
    getCommunities,
    getCommunity,
    sendJoinRequest,
    sendModRequest,
    sendCommunityUpdateRequest,
    sendRuleAddRequest,
    sendRuleRemoveRequest,
    community_UploadImage,
    sendAddBanRequest,
    sendRemoveBanRequest,
} from '../util/api';

import { getNewToken } from './auth';

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
        dispatch(getNewToken());
        return true;
    } catch (error) {
        dispatch(memberCommunityError(error));
        return false;
    }
};

export const UPDATE_COMMUNITY_REQUEST = 'COMMUNITY_UPDATE_REQUEST';
export const UPDATE_COMMUNITY_SUCCESS = 'COMMUNITY_UPDATE_SUCCESS';
export const UPDATE_COMMUNITY_ERROR = 'COMMUNITY_UPDATE_ERROR';

const updateCommunityRequest = { type: UPDATE_COMMUNITY_REQUEST };
const updateCommunitySuccess = community => ({ type: UPDATE_COMMUNITY_SUCCESS, community });
const updateCommunityError = error => ({ type: UPDATE_COMMUNITY_ERROR, error });

export const updateCommunity = (name = '', update = {}) => async (dispatch, getState) => {
    dispatch(updateCommunityRequest);
    try {
        const { token } = getState().auth;
        const community = await sendCommunityUpdateRequest(name, update, token);
        dispatch(updateCommunitySuccess(community));
        dispatch(getNewToken());
        return true;
    } catch (error) {
        dispatch(updateCommunityError(error));
        return false;
    }
};

export const COMMUNITY_IMAGE_UPLOAD_REQUEST = 'COMMUNITY_IMAGE_UPLOAD_REQUEST';
export const COMMUNITY_IMAGE_UPLOAD_SUCCESS = 'COMMUNITY_IMAGE_UPLOAD_SUCCESS';
export const COMMUNITY_IMAGE_UPLOAD_ERROR = 'COMMUNITY_IMAGE_UPLOAD_ERROR';

const imageUploadRequest = { type: COMMUNITY_IMAGE_UPLOAD_REQUEST };
const imageUploadSuccess = { type: COMMUNITY_IMAGE_UPLOAD_SUCCESS };
const imageUploadError = error => ({ type: COMMUNITY_IMAGE_UPLOAD_ERROR, error });

export const imageUpload = (name = '', image) => async (dispatch, getState) => {
    dispatch(imageUploadRequest);
    try {
        let formData = new FormData();
        formData.append('c_avatar', image, image.name);

        const { token } = getState().auth;
        const path = await community_UploadImage(name, formData, token);
        dispatch(imageUploadSuccess);
        dispatch(fetchCommunity(name));
        return true;
    } catch (error) {
        dispatch(imageUploadError(error));
        console.log(error);
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

export const ADD_RULE_REQUEST = 'ADD_RULE_REQUEST';
export const ADD_RULE_SUCCESS = 'ADD_RULE_SUCCESS';
export const ADD_RULE_ERROR = 'ADD_RULE_ERROR';

const addRuleRequest = { type: ADD_RULE_REQUEST };
const addRuleSuccess = ({ type: ADD_RULE_SUCCESS });
const addRuleError = error => ({ type: ADD_RULE_ERROR, error });

export const addRule = (name = '', rule = {}) => async (dispatch, getState) => {
    dispatch(addRuleRequest);
    try {
        const { token } = getState().auth;
        const result = await sendRuleAddRequest(name, rule, token);
        dispatch(addRuleSuccess);
        dispatch(fetchCommunity(name));
        return true;
    } catch (error) {
        dispatch(addRuleError(error));
        return false;
    }
};

export const REMOVE_RULE_REQUEST = 'REMOVE_RULE_REQUEST';
export const REMOVE_RULE_SUCCESS = 'REMOVE_RULE_SUCCESS';
export const REMOVE_RULE_ERROR = 'REMOVE_RULE_ERROR';

const removeRuleRequest = { type: REMOVE_RULE_REQUEST };
const removeRuleSuccess = ({ type: REMOVE_RULE_SUCCESS });
const removeRuleError = error => ({ type: REMOVE_RULE_ERROR, error });

export const removeRule = (name = '', ruleid = '') => async (dispatch, getState) => {
    dispatch(removeRuleRequest);
    try {
        const { token } = getState().auth;
        const result = await sendRuleRemoveRequest(name, ruleid, token);
        dispatch(removeRuleSuccess);
        dispatch(fetchCommunity(name));
        return true;
    } catch (error) {
        dispatch(removeRuleError(error));
        return false;
    }
};

export const ADD_BAN_REQUEST = 'ADD_BAN_REQUEST';
export const ADD_BAN_SUCCESS = 'ADD_BAN_SUCCESS';
export const ADD_BAN_ERROR = 'ADD_BAN_ERROR';

const addBanRequest = { type: ADD_BAN_REQUEST };
const addBanSuccess = ({ type: ADD_BAN_SUCCESS });
const addBanError = error => ({ type: ADD_BAN_ERROR, error });

export const addBan = (name = '', body = {}) => async (dispatch, getState) => {
    dispatch(addBanRequest);
    try {
        const { token } = getState().auth;
        const result = await sendAddBanRequest(name, body, token);
        dispatch(addBanSuccess);
        dispatch(fetchCommunity(name));
        return true;
    } catch (error) {
        dispatch(addBanError(error));
        return false;
    }
};

export const REMOVE_BAN_REQUEST = 'REMOVE_BAN_REQUEST';
export const REMOVE_BAN_SUCCESS = 'REMOVE_BAN_SUCCESS';
export const REMOVE_BAN_ERROR = 'REMOVE_BAN_ERROR';

const removeBanRequest = { type: REMOVE_BAN_REQUEST };
const removeBanSuccess = ({ type: REMOVE_BAN_SUCCESS });
const removeBanError = error => ({ type: REMOVE_BAN_ERROR, error });

export const removeBan = (name, userid = '') => async (dispatch, getState) => {
    dispatch(removeBanRequest);
    try {
        const { token } = getState().auth;
        const result = await sendRemoveBanRequest(name, userid, token);
        dispatch(removeBanSuccess);
        dispatch(fetchCommunity(name));
        return true;
    } catch (error) {
        dispatch(removeBanError(error));
        return false;
    }
};