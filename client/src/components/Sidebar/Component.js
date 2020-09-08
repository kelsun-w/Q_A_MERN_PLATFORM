import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryList from './CategoryList';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ token }) => (
  <Wrapper>
    <SidebarCategoryList />
  </Wrapper>
);

export default Sidebar;
