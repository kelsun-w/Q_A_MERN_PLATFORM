import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../util/withAuth';
import { attemptSignup } from '../../actions/auth';
import validate from './validate';
import SignupForm from './Component';
import { withCookies } from 'react-cookie';

const majors = [
  'Software Engineering',
  'International Development',
  'Information Communication Engineering',
  'Computer Engineering',
  'Information Technology',
  'Computer Science'
];

const mapStateToProps = state => ({
  loading: state.auth.loading,
  majors: majors
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
