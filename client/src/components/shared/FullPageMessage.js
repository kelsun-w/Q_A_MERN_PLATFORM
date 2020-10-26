import React from 'react';
import styled from 'styled-components/macro';
import { normalFont } from './helpers';

const Wrapper = styled.div`
  ${normalFont};

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  border: 1px solid ${props => props.theme.border};
  border-radius: 2px;
  padding: 48px 0;
  background-color: ${props => props.theme.foreground};
  color: ${props => props.theme.mutedText};
  width: 100%;
  min-height: 400px;

  & > :first-child {
    margin-bottom: 20px;
    font-size: 80px;
    max-width: 200px;
    max-height:200px;
    object-fit: cover;
  };

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const FullPageMessage = ({ children }) => (
  <Wrapper >{children}</Wrapper>
);

export default FullPageMessage;
