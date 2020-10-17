import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';
import {
    updateCommunity
} from '../../../../../../actions/community';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching
});

const mapDispatchToProps = {
    updateCommunity
};

export default compose(
    reduxForm({ form: 'modtools_about' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);