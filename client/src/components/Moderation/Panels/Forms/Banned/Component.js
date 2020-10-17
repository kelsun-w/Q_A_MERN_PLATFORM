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

var HEADER = '';
var BTN_TEXT = '';
const USERNAME_LABEL = 'Username';
const REASON_LABEL = 'Rule broken';
const REASON_SUBLABEL = 'Select the reason user wil be banned.';
const MOD_LABEL = 'Mod Note (OPTIONAL)';
const MOD_SUBLABEL = 'Briefly explain the reason behind the ban.'

class BanForm extends React.Component {

    constructor(props) {
        super(props);
        HEADER = props.edit ? 'Ban Details : ' + props.initialValues.user : 'Ban a User';
        BTN_TEXT = props.edit ? 'Save Changes' : 'Ban User';

        const selected = props.edit ? props.initialValues.offence : props.rules[0] && props.rules[0].title;
        this.state = {
            selectedOption: selected
        };
    };

    handleSelect = event => {
        this.setState({ selectedOption: event.target.value }, () => console.log(this.state));
    };

    onSubmit = async (values) => {
        const { rules } = this.props;
        //Sincee select input's value isn't setting value, I'm using this hack.
        if (!this.props.edit && !values.offence) {
            var offence;
            if (rules[0]) {
                offence = rules[0].title;
            } else {
                offence = 'Unspecified Misconduct'
            }
            
            values['offence'] = offence;
        }
        const result = await this.props.callback({ ...values });
    };

    mapRules = () =>
        this.props.rules.map((category, index) => {
            return (
                <option key={index} value={category.title} >
                    { category.title}
                </option>
            )
        });

    render() {
        const { isFetching, edit } = this.props;
        return (
            <>
                <Header>{HEADER}</Header>
                <StyledForm
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name='user'
                        label={USERNAME_LABEL}
                        type='text'
                        component={renderField}
                        disabled={edit}
                    />
                    <Field
                        name='offence'
                        label={REASON_LABEL}
                        sublabel={!edit ? REASON_SUBLABEL : null}
                        type='select'
                        component={renderField}
                        onChange={this.handleSelect}
                    >
                        {this.mapRules()}
                    </Field>
                    <Field
                        name='note'
                        label={MOD_LABEL}
                        sublabel={!edit ? MOD_SUBLABEL : null}
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

export default BanForm;