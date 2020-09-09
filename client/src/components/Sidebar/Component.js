import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryList from './CategoryList';
import { Route } from 'react-router-dom';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-basis: 260px;
  margin-right: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ token }) => (
  <Wrapper>
    <Route exact path='/' component={SidebarCategoryList} />
  </Wrapper>
);

export default Sidebar;
