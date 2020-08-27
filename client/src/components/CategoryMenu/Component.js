import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'react-router-dom';
import CategoryMenuDropdown from './Dropdown';
import CategoryMenuCreatePost from './CreatePost';

const Menu = styled.nav`
  display: block;
  border-left: none;
  border-right: none;
  margin-bottom: 16px;
`;

const CategoryMenu = props => (
  <Menu>
    {props.token && <CategoryMenuCreatePost />}
    <Route
      path='/a/:category'
      children={({ match, history }) => (
        <CategoryMenuDropdown
          category={match ? match.params.category : 'all'}
          history={history}
        />
      )}
    />
  </Menu>
);

export default CategoryMenu;
