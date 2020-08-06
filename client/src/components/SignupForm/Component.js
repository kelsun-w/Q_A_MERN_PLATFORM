import React from 'react';
import jwtDecode from 'jwt-decode';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator, passwordValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';
import Header from '../shared/form/Header';

class SignupForm extends React.Component {
  componentDidMount() {
    const { cookies } = this.props;
    const auth_profile = cookies.get('google_jwt');

    if (!auth_profile) this.props.history.push('/unauthorised');

    this.redirectIfLoggedIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.token) this.props.history.push('/');
  }
  componentWillUnmount() {
    const cookie = this.props.cookies;
    if (cookie.get('google_jwt'))
      cookie.remove('google_jwt')
  }

  onSubmit = ({ username, password }) => {
    const cookie = this.props.cookies.get('google_jwt');
    const auth_profile = jwtDecode(cookie).user;
    const email = auth_profile.email;
    const studentNo = email.substring(0, email.indexOf("@"));

    const user = {
      username: username,
      password: password,
      email: email,
      studentNo: studentNo,
      major: 'Software Engineering'
    }
    this.props.attemptSignup(user);
  };

  render() {
    return (
      <Form
        loading={this.props.loading}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Header>Register your account</Header>
        <Field
          name='username'
          label='username'
          type='text'
          component={renderField}
          validate={usernameValidator}
        />
        <Field
          name='password'
          label='password'
          type='password'
          component={renderField}
          validate={passwordValidator}
        />
        <Field
          name='password2'
          label='confirm password'
          type='password'
          component={renderField}
        />
        <SubmitButton type='submit'>sign up</SubmitButton>
      </Form>
    );
  }
}

export default SignupForm;
