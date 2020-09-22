import React from 'react';
import styled from 'styled-components/macro';
import { link } from './helpers';
import Button from './Button';

const Wrapper = styled(Button)`
  ${link};
  color: #fff;
  font-size: 13px;
  width: 90%;
  margin: auto;
`;

const DeleteButton = ({ joined, onClick }) => (
  < Wrapper onClick={onClick} > {joined ? 'Joined' : 'Join'}</Wrapper>
);

export default DeleteButton;
