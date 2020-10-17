import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createReport } from '../../../../../actions/reports';
import { fetchCommunity } from '../../../../../actions/community';
import Component from './Component.js';

const mapStateToProps = state => ({
    community: state.community.community,
    isLoading: state.report.loading
});

const mapDispatchToProps = {
    fetchCommunity,
    createReport
};

export default compose(
    reduxForm({ form: 'post_report' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);