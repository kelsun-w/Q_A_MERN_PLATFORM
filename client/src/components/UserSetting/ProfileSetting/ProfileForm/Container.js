import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { userUpdate } from '../../../../actions/user';
import Component from './Component.js';

const mapStateToProps = state => ({
    isUpdating: state.user.updating
});

const mapDispatchToProps = {
    userUpdate
};

export default compose(
    reduxForm({ form: 'usersetting_profile' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Component);