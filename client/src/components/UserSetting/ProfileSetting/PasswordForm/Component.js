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

const header = 'Create a new password';
const subHeader = 'Update your current password with a new one';
const cpw_Label = 'Current password';
const npw_Label = 'New password';

class ProfileForm extends React.Component {

    onSubmit = values => {
        this.props.userUpdate(values);
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
                        name='current_password'
                        label={cpw_Label}
                        type='password'
                        component={renderField} />
                    <Field
                        name='password'
                        label={npw_Label}
                        type='password'
                        component={renderField} />
                    <StyledButton type='submit' disabled={isUpdating}>
                        {isUpdating && <StyledSpinner />}
                        <span>SAVE CHANGES</span>
                    </StyledButton>
                </StyledForm>
            </wrapper>
        );
    }
};

export default ProfileForm;