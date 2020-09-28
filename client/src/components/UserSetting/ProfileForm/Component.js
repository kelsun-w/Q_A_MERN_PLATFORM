import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../shared/form/Form';
import renderField from '../../shared/form/renderField';
import SubmitButton from '../../shared/form/SubmitButton';

const StyledForm = styled(Form)`
    max-width: 100%;
    padding: 8px;
    border: none;
`;

const dn_Label = 'display name (Optional)';
const dn_SubLabel = 'Does not change your username. Only appears on your profile';
const da_Label = 'About (Optional)';
const da_SubLabel = 'Write a brief description of yourself to show on your profile';

class ProfileForm extends React.Component {
    
    onSubmit = values => {
        alert(JSON.stringify(values));
    }

    render() {
        return (
            <StyledForm
                form='userSetting_display'
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
                <SubmitButton type='submit'>SAVE CHANGES</SubmitButton>
            </StyledForm>
        );
    }
};

export default ProfileForm;