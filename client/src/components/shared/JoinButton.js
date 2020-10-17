import React from 'react';
import styled, { css } from 'styled-components/macro';
import { link } from './helpers';
import Button from './Button';
import { normalFont } from './helpers';

const Wrapper = styled(Button)`
  ${link};
  ${normalFont};
  
  color: #fff;
  width: 90%;
  margin: auto;
  ${({ joined }) => joined ?
    css`
      background-color: ${props => props.theme.inputBackground};
      border: 1px solid ${props => props.theme.accent};
      color: ${props => props.theme.normalText};`
    : `none`};
`;

const DeleteButton = ({ joined, onClick }) => (
  < Wrapper onClick={onClick} joined={joined}> {joined ? 'Joined' : 'Join'}</Wrapper>
);

export default DeleteButton;
