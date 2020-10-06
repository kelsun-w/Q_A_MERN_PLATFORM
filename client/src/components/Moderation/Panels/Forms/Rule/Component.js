import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Form from '../../../../shared/form/Form';
import renderField from '../../../../shared/form/renderField';
import SubmitButton from '../../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../../shared/LoadingIndicator/Spinner';
import Header from '../../../../shared/Header';
import { SubHeading } from '../../../helpers';

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

var SUBHEADER = '';
var HEADER = '';
var BTN_TEXT = '';
const TITLE_LABEL = 'Rule Title';
const TITLE_SUBLABEL = 'Rule display (e.g. "No harrassment")';
const DESC_LABEL = 'Description';
const DESC_SUBLABEL = 'Enter full description of the rule.';

class RuleForm extends React.Component {

    constructor(props) {
        super(props);
        HEADER = props.edit ? 'Edit Rule : ' + this.props.initialValues.title : 'Add Rule';
        SUBHEADER = props.edit ? '' : 'Let community members know the required behaviour in the community through rules';
        BTN_TEXT = props.edit ? 'Save Changes' : 'Add Rule';
    };

    onSubmit = async (values) => {
        const result = await this.props.callback({ ...values });
    };

    render() {
        const { isFetching, edit } = this.props;
        return (
            <>
                {edit ?
                    <Header >{HEADER}</Header>
                    :
                    <>
                        <Header noBorder>{HEADER}</Header>
                        <SubHeading>{SUBHEADER}</SubHeading>
                    </>
                }
                <StyledForm
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name='title'
                        label={TITLE_LABEL}
                        sublabel={!edit ? TITLE_SUBLABEL : null}
                        type='text'
                        component={renderField}
                    />
                    <Field
                        name='description'
                        label={DESC_LABEL}
                        sublabel={!edit ? DESC_SUBLABEL : null}
                        type='textarea'
                        component={renderField}
                    />
                    <StyledButton type='submit' disabled={this.props.pristine || isFetching}>
                        {isFetching && <StyledSpinner />}
                        <span>{BTN_TEXT}</span>
                    </StyledButton>
                </StyledForm>
            </>
        );
    }
};

export default RuleForm;