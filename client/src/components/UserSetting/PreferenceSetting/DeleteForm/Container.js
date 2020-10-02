import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { userDelete } from '../../../../actions/user';
import withAuth from '../../../../util/withAuth';
import Component from './Component.js';

const mapStateToProps = state => ({
    isUpdating: state.user.updating
});

const mapDispatchToProps = {
    userDelete
};

export default compose(
    withAuth,
    reduxForm({ form: 'usersetting_delete' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);