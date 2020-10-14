import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuth from '../../../../util/withAuth';
import { userSavePost } from '../../../../actions/user';
import Component from './Component.js';

const mapDispatchToProps = {
    userSavePost,
};

export default compose(
    withAuth,
    connect(null, mapDispatchToProps)
)(Component);