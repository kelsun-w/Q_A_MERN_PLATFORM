import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';
import {
    assignMod
} from '../../../../../actions/community';

const mapStateToProps = state => ({
    isUploading: state.user.uploading
});

const mapDispatchToProps = {
};

export default compose(
    reduxForm({ form: 'modtools_addRule' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);