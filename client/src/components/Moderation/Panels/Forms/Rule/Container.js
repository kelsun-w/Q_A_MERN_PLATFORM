import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching
});

export default compose(
    reduxForm({
        form: 'modtools_rule',
    }),
    connect(mapStateToProps, null)
)(Component);