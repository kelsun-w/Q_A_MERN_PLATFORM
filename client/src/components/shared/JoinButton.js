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
  !(joined) ?
    < Wrapper onClick={onClick} > Join</Wrapper> :
    < Wrapper disabled> Joined</Wrapper>
);

export default DeleteButton;
