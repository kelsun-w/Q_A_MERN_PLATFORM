import React from 'react';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator, passwordValidator } from '../../util/validators';
import SubmitButton from '../shared/form/SubmitButton';
import Header from '../shared/form/Header';
import HeroUnit from './HeroUnit';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  /* background: brown; */
  margin: 0 5vw;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`
const HiddenTitle = styled.div`
  display: none;
  font-size: 22px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  margin-bottom: 16px;
  min-width: 260px;
  color: ${props => props.theme.normalText};
  
  @media (max-width: 800px){
    display: block;
  }
`

const FormWrapper = styled(Form)`
      flex-grow: 1; 
      flex-shrink: 0;
      margin: 0;
    `

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

  onSubmit = ({ username, password, major }) => {
    const cookie = this.props.cookies.get('google_jwt');
    const auth_profile = jwtDecode(cookie).user;
    const email = auth_profile.email;
    const studentNo = email.substring(0, email.indexOf("@"));

    const user = {
      username: username,
      password: password,
      email: email,
      studentNo: studentNo,
      major: major
    }
    this.props.attemptSignup(user);
  };

  mapCategories = (categories) =>
    categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));

  render() {
    return (
      <Wrapper>
        <HiddenTitle> Register your account and connect with other MFU students! </HiddenTitle>
        <HeroUnit />
        <FormWrapper
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
          <Field
            name='major'
            label='Enter your major'
            type='select'
            component={renderField}
          >
            {this.mapCategories(this.props.majors)}
          </Field>
          <SubmitButton type='submit'>sign up</SubmitButton>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default SignupForm;
