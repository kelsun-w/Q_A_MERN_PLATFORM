import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { imageUpload } from '../../../../actions/user';
import withAuth from '../../../../util/withAuth';
import Component from './Component.js';

const mapStateToProps = state => ({
    isUploading: state.user.uploading
});

const mapDispatchToProps = {
    imageUpload
};

export default compose(
    withAuth,
    reduxForm({ form: 'usersetting_image' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);