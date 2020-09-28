import { reduxForm } from 'redux-form';
import Component from './Component.js';

export default reduxForm({
    form: 'usersetting_profile', 
})(Component);