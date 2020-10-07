import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../../../shared/form/Form';
import renderField from '../../../../../shared/form/renderField';
import SubmitButton from '../../../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../../../shared/LoadingIndicator/Spinner';

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
`;

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
`;

const ABOUT_LABEL = 'About (Optional)';
const ABOUT_SUBLABEL = 'Write a brief description about the community';

class AboutForm extends React.Component {
    onSubmit = async values => {
        const { id, updateCommunity } = this.props;
        const result = await updateCommunity(id, values);
        if (result) window.location.reload();
    }

    render() {
        const { isFetching, pristine, handleSubmit } = this.props;
        return (
            <wrapper>
                <StyledForm
                    form='userSetting_display'
                    onSubmit={handleSubmit(this.onSubmit)}
                >
                    <Field
                        name='description'
                        label={ABOUT_LABEL}
                        sublabel={ABOUT_SUBLABEL}
                        type='textarea'
                        component={renderField} />
                    <StyledButton type='submit' disabled={pristine || isFetching}>
                        {isFetching && <StyledSpinner />}
                        <span>SAVE CHANGES</span>
                    </StyledButton>
                </StyledForm>
            </wrapper>
        );
    }
};

export default AboutForm;
