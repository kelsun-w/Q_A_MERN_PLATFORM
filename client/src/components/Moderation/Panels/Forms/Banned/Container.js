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
    assignMod
};

export default compose(
    reduxForm({ form: 'usersetting_image' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);