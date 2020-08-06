import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { attemptLogin } from '../../actions/auth';
import LoginForm from './Component';
import withAuth from '../../util/withAuth';

const mapStateToProps = state => ({
  loading: state.auth.loading,
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = { attemptLogin };

const enhance = compose(
  reduxForm({ form: 'login' }),
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const LoginFormContainer = enhance(LoginForm);

export default LoginFormContainer;
