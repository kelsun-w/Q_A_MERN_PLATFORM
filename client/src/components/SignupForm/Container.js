import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import { attemptSignup } from '../../actions/auth';
import validate from './validate';
import SignupForm from './Component';
import { withCookies } from 'react-cookie';

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = { attemptSignup };

const enhance = compose(
  reduxForm({ form: 'signup', validate }),
  withAuth,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SignupFormContainer = withCookies(enhance(SignupForm));

export default SignupFormContainer;
