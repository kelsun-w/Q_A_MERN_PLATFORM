import {
    reportsFetchRequest,
    reportCreateRequest,
    reportUpdateRequest,
    reportDeleteRequest,
} from '../util/api';

export const FETCH_REPORTS_REQUEST = 'FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';

const fetchReportsRequest = { type: FETCH_REPORTS_REQUEST };
const fetchReportsSuccess = reports => ({ type: FETCH_REPORTS_SUCCESS, reports });
const fetchReportsError = error => ({ type: FETCH_REPORTS_ERROR, error });

export const fetchReports = (name = '') => async (dispatch, getState) => {
    dispatch(fetchReportsRequest);
    try {
        const { token } = getState().auth;
        const result = await reportsFetchRequest(name, token);
        dispatch(fetchReportsSuccess(result));
        return true;
    } catch (error) {
        dispatch(fetchReportsError(error));
        return false;
    }
};

export const CREATE_REPORT_REQUEST = 'CREATE_REPORT_REQUEST';
export const CREATE_REPORT_SUCCESS = 'CREATE_REPORT_SUCCESS';
export const CREATE_REPORT_ERROR = 'CREATE_REPORT_ERROR';

const createReportRequest = { type: CREATE_REPORT_REQUEST };
const createReportSuccess = { type: CREATE_REPORT_SUCCESS };
const createReportError = error => ({ type: CREATE_REPORT_ERROR, error });

export const createReport = (name = '', body = {}) => async (dispatch, getState) => {
    dispatch(createReportRequest);
    try {
        const { token } = getState().auth;
        const result = await reportCreateRequest(body, token);
        dispatch(createReportSuccess);
        return dispatch(fetchReports(name));
    } catch (error) {
        dispatch(createReportError(error));
        return false;
    }
};

export const UPDATE_REPORT_REQUEST = 'UPDATE_REPORT_REQUEST';
export const UPDATE_REPORT_SUCCESS = 'UPDATE_REPORT_SUCCESS';
export const UPDATE_REPORT_ERROR = 'UPDATE_REPORT_ERROR';

const updateReportRequest = { type: UPDATE_REPORT_REQUEST };
const updateReportSuccess = report => ({ type: UPDATE_REPORT_SUCCESS, report });
const updateReportError = error => ({ type: UPDATE_REPORT_ERROR, error });

export const updateReport = (reportID = '', update = {}) => async (dispatch, getState) => {
    dispatch(updateReportRequest);
    try {
        const { token } = getState().auth;
        const result = await reportUpdateRequest(reportID, update, token);
        dispatch(updateReportSuccess(result.doc));
        return true;
    } catch (error) {
        dispatch(updateReportError(error));
        return false;
    }
};

export const DELETE_REPORT_REQUEST = 'DELETE_REPORT_REQUEST';
export const DELETE_REPORT_SUCCESS = 'DELETE_REPORT_SUCCESS';
export const DELETE_REPORT_ERROR = 'DELETE_REPORT_ERROR';

const deleteReportRequest = { type: DELETE_REPORT_REQUEST };
const deleteReportSuccess = deletedReportID => ({ type: DELETE_REPORT_SUCCESS, deletedReportID });
const deleteReportError = error => ({ type: DELETE_REPORT_ERROR, error });

export const deleteReport = (reportId = '') => async (dispatch, getState) => {
    dispatch(deleteReportRequest);
    try {
        const { token } = getState().auth;
        const result = await reportDeleteRequest(reportId, token);
        dispatch(deleteReportSuccess(result.id));
        return true;
    } catch (error) {
        dispatch(deleteReportError(error));
        return false;
    }
};