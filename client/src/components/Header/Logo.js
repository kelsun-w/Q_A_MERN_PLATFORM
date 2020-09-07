import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { headerItem } from '../shared/helpers';
import LogoSymbol from '../shared/logo';

const Wrapper = styled.div`
  ${headerItem};
  
  flex: 1;
  margin-right: auto;
  padding-right: 10px;

  @media (max-width: 920px) {
    flex: 0;
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.normalText};
  text-decoration: none;
  
  display: flex;
  align-items:center;

  @media (max-width: 425px) {
    padding: 0 8px 0 16px;
  }

  @media (max-width: 920px) {
    padding-right: 8px;

    & span{
      display: none;
    }
  }
`;

const HeaderLogo = () =>
  <Wrapper>
    <Logo to='/'>
      <LogoSymbol />
      <span>MFU Life</span>
    </Logo>
  </Wrapper>

export default HeaderLogo;
