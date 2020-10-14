import React from 'react';
import styled from 'styled-components/macro';
import { smallFont } from './helpers';

const Wrapper = styled.div`
  ${smallFont};

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
