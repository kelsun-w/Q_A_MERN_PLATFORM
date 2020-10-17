import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';

const mapStateToProps = state => ({
    isLoading: state.report.loading
});

export default compose(
    reduxForm({ form: 'modtools_reports' }),
    connect(mapStateToProps, null)
)(Component);