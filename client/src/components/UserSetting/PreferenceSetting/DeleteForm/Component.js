import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../shared/form/Form';
import renderField from '../../../shared/form/renderField';
import SubmitButton from '../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../shared/LoadingIndicator/Spinner';
import Header from '../../../shared/Header';
import { SubHeading } from '../../helpers';

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const StyledSpinner = styled(LoadingIndicator)`
    width: 1rem;
    height: 1rem;
    cursor: none;
    left: 8%;
    bottom: 50%;
`

const StyledButton = styled(SubmitButton)`
    position: relative;
    &:disabled {
        background: #ddd;
        
        :hover,
        :active,
        :focus {
            filter: none;
            box-shadow: none;
            cursor: initial;
        }
    }
`

const header = 'ARE YOU SURE? ';
const subHeader = 'Once you delete your account, you will not get it back.';
const pw_Label = 'Enter password';

class DeleteForm extends React.Component {

    onSubmit = values => {
        this.props.userDelete(values);
    }

    render() {
        const { isUpdating } = this.props;
        return (
            <wrapper>
                <StyledForm
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Header noBorder>{header}</Header>
                    <SubHeading>{subHeader}</SubHeading>
                    <Field
                        name='password'
                        label={pw_Label}
                        type='password'
                        component={renderField} />
                    <StyledButton type='submit' disabled={isUpdating} danger>
                        {isUpdating && <StyledSpinner />}
                        <span>DELETE ACCOUNT</span>
                    </StyledButton>
                </StyledForm>
            </wrapper>
        );
    }
};

export default DeleteForm;