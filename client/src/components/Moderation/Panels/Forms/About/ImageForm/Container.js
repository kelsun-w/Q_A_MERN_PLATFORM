import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';
import {
    imageUpload
} from '../../../../../../actions/community';

const mapStateToProps = state => ({
    isUploading: state.community.isUploading
});

const mapDispatchToProps = {
    imageUpload
};

export default compose(
    reduxForm({ form: 'modtools_image' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);