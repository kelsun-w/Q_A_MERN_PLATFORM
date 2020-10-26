import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import Component from './Component.js';

export default compose(
    reduxForm({ form: 'darktheme_toggle' })
)(Component);