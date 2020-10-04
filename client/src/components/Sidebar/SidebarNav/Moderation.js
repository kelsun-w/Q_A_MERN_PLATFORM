import React from 'react';
import styled from 'styled-components/macro';
import Header from '../../shared/Header';
import NavLink from '../../shared/NavLink';
import { normalFont, overflow } from '../../shared/helpers';

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 8px;
  color: ${props => props.theme.normalText};

  & > :nth-child(2) {
    margin-top: 6px;
  }
`;

const NavItem = styled(NavLink).attrs({ light: true })`
  ${overflow};
  ${normalFont};
  display: flex;
  padding: 4px 10px;
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.normalText};
  border-radius: 2px;
  margin: 1px 0;

  :hover, :focus {
    outline: 0;
    color: ${props => props.theme.accent};
  }

  &.active {
    background-color: ${props => props.theme.border};
    ::after {
      opacity: 1;
    }
  }
`;

const SettingNavigation = props => (
  <Wrapper>
    <Header> Moderation </Header>
    <NavItem exact to={`${props.url}/about`} onMouseDown={(e) => e.preventDefault()} >
      About
    </NavItem>
    <NavItem exact to={`${props.url}/reports`} onMouseDown={(e) => e.preventDefault()} >
      Reports
    </NavItem>
    <NavItem exact to={`${props.url}/moderators`} onMouseDown={(e) => e.preventDefault()} >
      Moderators
    </NavItem>
    <NavItem exact to={`${props.url}/banned`} onMouseDown={(e) => e.preventDefault()} >
      Banned
    </NavItem>
    <NavItem exact to={`${props.url}/rules`} onMouseDown={(e) => e.preventDefault()} >
      Rules
    </NavItem>
  </Wrapper>
)

export default SettingNavigation;
