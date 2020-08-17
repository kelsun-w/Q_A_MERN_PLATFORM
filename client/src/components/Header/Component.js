import React from 'react';
import styled from 'styled-components/macro';
import HeaderLogo from './Logo';
import HeaderNavLink from './NavLink';
import OverflowMenu from './OverflowMenu/Component';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown/Component';

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-between;
  
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  border-bottom: 1px solid ${props => props.theme.border};
  height: 48px;
  padding: 0 2vw;
  background-color: ${props => props.theme.foreground};
  user-select: none;

  & div:nth-child(3){
    margin-right: 30px;
  }

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 5px;

    & div:nth-child(3){
      margin-right: 10px;
    };
  }
`;

const Header = ({ user, logout }) => (
  <Wrapper>
    <HeaderLogo />
    <SearchBar placeholder='🔎 Search something' />
    {user ? (
      <>
        <OverflowMenu />
        <Dropdown user={user} />
      </>
    ) : (
        <>
          <HeaderNavLink to='/login'>log in</HeaderNavLink>
          <HeaderNavLink to='/signup'>sign up</HeaderNavLink>
        </>
      )}
  </Wrapper>
);

export default Header;
