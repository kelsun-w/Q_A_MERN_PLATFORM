import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import {
    fetchCommunity,
    updateCommunity,
    imageUpload,
    assignMod,
    addRule,
    removeRule,
    addBan,
    removeBan,
} from '../../actions/community';

import {
    fetchReports,
    createReport,
    updateReport,
    deleteReport
} from '../../actions/reports';

import ModerationComponent from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    community: state.community.community,
    reports: state.report.items
});

const mapDispatchToProps = {
    fetchCommunity,
    updateCommunity,
    imageUpload,
    assignMod,
    addRule,
    removeRule,
    addBan,
    removeBan,
    fetchReports,
    createReport,
    updateReport,
    deleteReport
};

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const ModerationContainer = enhance(ModerationComponent);

export default withRouter(ModerationContainer);


