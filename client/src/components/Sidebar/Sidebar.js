import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryListContainer from './CategoryList/Container';
import CommunityDetailContainer from './CommunityDetail/Container';
import { Route } from 'react-router-dom';
import Profile from './Profile/Container';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-basis: 260px;
  margin-right: 16px;
  
  @media (max-width: 768px) {
    display: none;
  }

  & > * {
    margin-bottom: 16px;
  }
`;

const Sidebar = (props) => (
  <Wrapper>
    <Route exact path='/' component={SidebarCategoryListContainer} />
    <Route
      path='/c/:category'
      render={({ match }) => (
        <CommunityDetailContainer category={match.params.category} />
      )}
    />
    <Route path='/u/' component={Profile} />
  </Wrapper>
);

export default Sidebar;
