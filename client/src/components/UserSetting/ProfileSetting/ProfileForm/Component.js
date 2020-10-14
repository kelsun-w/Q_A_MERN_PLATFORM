import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../shared/form/Form';
import renderField from '../../../shared/form/renderField';
import SubmitButton from '../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../shared/LoadingIndicator/Spinner';

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

const dn_Label = 'display name (Optional)';
const dn_SubLabel = 'Does not change your username. Only appears on your profile';
const da_Label = 'About (Optional)';
const da_SubLabel = 'Write a brief description of yourself to show on your profile';

class ProfileForm extends React.Component {

    onSubmit = values => {
        this.props.userUpdate(values);
    }

    render() {
        const { isUpdating, pristine } = this.props;
        return (
            <wrapper>
                <StyledForm
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name='display_name'
                        label={dn_Label}
                        sublabel={dn_SubLabel}
                        type='text'
                        component={renderField} />
                    <Field
                        name='display_about'
                        label={da_Label}
                        sublabel={da_SubLabel}
                        type='textarea'
                        component={renderField} />
                    <StyledButton type='submit' disabled={pristine || isUpdating}>
                        {isUpdating && <StyledSpinner />}
                        <span>SAVE CHANGES</span>
                    </StyledButton>
                </StyledForm>
            </wrapper>
        );
    }
};

export default ProfileForm;