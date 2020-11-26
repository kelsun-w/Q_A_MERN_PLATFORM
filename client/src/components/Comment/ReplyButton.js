import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledReplyButton = styled.button`
  margin: 4px 4px 4px 8px;
  padding: 2px 8px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 13px;
  color: ${props => props.theme.normalText};
  margin-right: auto;
`;

const ReplyButton = ({ onClick }) => (
    <StyledReplyButton type='submit' onClick={onClick}>
        <FontAwesomeIcon icon='comment-alt' />&nbsp;
        Reply
    </StyledReplyButton>
);

export default ReplyButton;