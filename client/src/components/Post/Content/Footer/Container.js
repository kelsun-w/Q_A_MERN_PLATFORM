import { compose } from 'redux';
import withAuth from '../../../../util/withAuth';
import Component from './Component.js';

export default compose(
    withAuth
)(Component);