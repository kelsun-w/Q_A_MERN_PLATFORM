import React from 'react';
import styled, { css } from 'styled-components/macro';
import { link } from './helpers';
import Button from './Button';

const Wrapper = styled(Button)`
  ${link};
  color: #fff;
  font-size: 13px;
  width: 90%;
  margin: auto;
  ${({ joined }) => joined ? css`background-color: ${props => props.theme.hover}` : `none`};
`;

const DeleteButton = ({ joined, onClick }) => (
  < Wrapper onClick={onClick} joined={joined}> {joined ? 'Joined' : 'Join'}</Wrapper>
);

export default DeleteButton;
