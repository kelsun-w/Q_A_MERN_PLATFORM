import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { userUpdate } from '../../../../actions/user';
import withAuth from '../../../../util/withAuth';
import Component from './Component.js';

const mapStateToProps = state => ({
    isUpdating: state.user.updating
});

const mapDispatchToProps = {
    userUpdate
};

export default compose(
    withAuth,
    reduxForm({ form: 'usersetting_password' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);