import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'redux-form';
import Form from '../../../../shared/form/Form';
import renderField from '../../../../shared/form/renderField';
import SubmitButton from '../../../../shared/form/SubmitButton';
import LoadingIndicator from '../../../../shared/LoadingIndicator/Spinner';
import Header from '../../../../shared/Header';
import { Link } from 'react-router-dom';
import { link } from '../../../../shared/helpers';
import Button from '../../../../shared/Button';

const StyledRowWrapper = styled(Header)`
    display: flex;
    align-items: center;
`;

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

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    & > * {
        flex: 1 1 auto;
        :not(:last-child){
            margin-right: 4px;
        }
        
        :not(:first-child){
            margin-left: 4px;
        }
    }
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

const StyledLink = styled(Link)`
    ${link};
    margin: -10px 0 10px;
    :hover,
    :focus {
        color: ${props => props.theme.accent};
        outline: none;
    }
`;

const DeleteButton = styled(Button)`
    margin: 0 0 5px 10px;
    padding: 8px 10px;
    :hover,
    :focus {
        background-color: ${props => props.theme.danger};
    }
`;

const HEADER = 'Report Details';
const SUB_HEADER = 'Post Details';
const BTN_ACCEPT_TEXT = 'Approve';
const BTN_REJECT_TEXT = 'Reject';

const USERNAME_LABEL = 'Offender username';
const RULE_LABEL = 'Rule Broken';
const POST_TITLE_LABEL = 'Post Title';
const POST_BODY_LABEL = 'Post Preview';
const SEE_MORE_TEXT = '...see full post';

class ReportForm extends React.Component {

    onSubmit = (accept) => async values => {
        const status = accept ? 1 : -1;
        this.props.handleUpdate({ status });
    };

    render() {
        const { isLoading, handleSubmit, handleRemove, initialValues: { community, postid, status } } = this.props;
        return (
            <>
                <StyledRowWrapper>
                    {HEADER}
                    <DeleteButton onClick={handleRemove} ><FontAwesomeIcon icon='trash' /></DeleteButton>
                </StyledRowWrapper>
                <StyledForm>
                    <Field
                        name='username'
                        label={USERNAME_LABEL}
                        type='text'
                        component={renderField}
                        disabled={true}
                    />
                    <Field
                        name='offence'
                        label={RULE_LABEL}
                        type='text'
                        component={renderField}
                        disabled={true}
                    />
                </StyledForm>
                <Header>{SUB_HEADER}</Header>
                <StyledForm>
                    <Field
                        name='title'
                        label={POST_TITLE_LABEL}
                        type='text'
                        component={renderField}
                        disabled={true}
                    />
                    <Field
                        name='preview'
                        label={POST_BODY_LABEL}
                        type='textarea'
                        component={renderField}
                        disabled={true}
                    />
                    <StyledLink to={`/c/${community}/${postid}`}>{SEE_MORE_TEXT}</StyledLink>
                    <ButtonWrapper>
                        <StyledButton
                            type='submit'
                            disabled={isLoading}
                            onClick={handleSubmit(this.onSubmit(false))}
                            disabled={status === -1}
                        >
                            {isLoading && <StyledSpinner />}
                            <span><FontAwesomeIcon icon='times' />&nbsp;{BTN_REJECT_TEXT}</span>
                        </StyledButton>
                        <StyledButton
                            type='submit'
                            disabled={isLoading}
                            onClick={handleSubmit(this.onSubmit(true))}
                            disabled={status === 1}
                        >
                            {isLoading && <StyledSpinner />}
                            <span><FontAwesomeIcon icon='check' />&nbsp;{BTN_ACCEPT_TEXT}</span>
                        </StyledButton>
                    </ButtonWrapper>
                </StyledForm>
            </>
        );
    }
};

export default ReportForm;