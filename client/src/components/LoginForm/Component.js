import React from 'react';
import styled from 'styled-components/macro';
import { Field } from 'redux-form';
import { usernameValidator, passwordValidator } from '../../util/validators';
import Form from '../shared/form/Form';
import GoogleLoginButton from '../shared/GoogleLoginButton';
import SubmitButton from '../shared/form/SubmitButton';
import renderField from '../shared/form/renderField';
import Header from '../shared/form/Header';
import Label from '../shared/form/Label';

class LoginForm extends React.Component {
  componentDidMount() {
    this.redirectOnChange();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectOnChange();
  }

  redirectOnChange() {
    if (this.props.token) { this.props.history.push('/') }
  }

  getGoogleAuthentication = () => {
    this.props.attemptGoogleAuth();
  }

  onSubmit = ({ username, password }) => {
    this.props.attemptLogin(username, password);
  };

  render() {
    return (
      <Form
        loading={this.props.loading}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Header>Sign in</Header>
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
        <SubmitButton type='submit'>log in</SubmitButton>
        <br />
        <Label>Don't have an account?</Label>
        <GoogleLoginButton>Login with Google</GoogleLoginButton>
      </Form>
    );
  }
}

export default LoginForm;
