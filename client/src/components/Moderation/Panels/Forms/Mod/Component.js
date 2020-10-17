import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../../shared/form/Form';
import renderField from '../../../../shared/form/renderField';
import SubmitButton from '../../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../../shared/LoadingIndicator/Spinner';
import Header from '../../../../shared/Header';

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

const label = 'Enter username of user to add';

class ModForm extends React.Component {

    onSubmit = async (values) => {
        const result = await this.props.callback(values.username);
    }

    render() {
        const { isFetching, } = this.props;
        return (
            <>
                <Header>Add a Mod</Header>
                <StyledForm
                    form="modtools_assignMod"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        sublabel={label}
                        name='username'
                        type='text'
                        component={renderField}
                    />
                    <StyledButton type='submit' disabled={isFetching}>
                        {isFetching && <StyledSpinner />}
                        <span>ADD MOD</span>
                    </StyledButton>
                </StyledForm>
            </>
        );
    }
};

export default ModForm;