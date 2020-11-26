import React from 'react';
import styled from 'styled-components/macro';
import Form from '../../shared/form/Form';
import { transition } from '../../shared/helpers';
import CommentFormTextArea from './TextArea';
import CommentFormSubmitButton from './SubmitButton';

const StyledForm = styled(Form)`
  ${transition('border', 'box-shadow')};

  margin-top: 2px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  max-width: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-top: -1px;
    border-radius: 0;
    border-left: none;
    border-right: none;

    :hover,
    :focus-within {
      border-left: none;
      border-right: none;
    }
  }
`;

class CommentForm extends React.Component {
  createComment = comment => {
    this.props.attemptCreateSubComment(this.props.parentId, comment);
    this.props.toggleCallback();
  }

  onSubmit = () => this.props.handleSubmit(this.createComment);

  render() {
    return (
      <StyledForm onSubmit={this.onSubmit()}>
        <CommentFormTextArea name='comment' onSubmit={this.onSubmit()} />
        <CommentFormSubmitButton />
      </StyledForm>
    );
  }
}

export default CommentForm;
