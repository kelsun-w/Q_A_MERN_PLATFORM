import {
    FETCH_REPORTS_REQUEST,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_ERROR,
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_ERROR,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_ERROR,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_ERROR
} from '../actions/reports';

const initialState = { loading: false, items: [] };


const updateItems = (report, items) =>
    items.map(i => (i.id === report.id ? report : i));

let items;
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPORTS_REQUEST:
        case UPDATE_REPORT_REQUEST:
        case DELETE_REPORT_REQUEST:
        case CREATE_REPORT_REQUEST:
            return { ...state, loading: true };

        case FETCH_REPORTS_SUCCESS:
            return { ...state, loading: false, items: action.reports };

        case CREATE_REPORT_SUCCESS:
            return { ...state, loading: false };

        case UPDATE_REPORT_SUCCESS:
            items = updateItems(action.report, state.items);
            return { ...state, loading: false, items };

        case DELETE_REPORT_SUCCESS:
            items = state.items.filter(i => i.id !== action.deletedReportID);
            return { ...state, loading: false, items };

        case FETCH_REPORTS_ERROR:
        case CREATE_REPORT_ERROR:
        case UPDATE_REPORT_ERROR:
        case DELETE_REPORT_ERROR:
            return { ...state, loading: false };
        default:
            return state;
    }
};