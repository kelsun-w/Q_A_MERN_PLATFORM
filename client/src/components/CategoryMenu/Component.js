import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Route } from 'react-router-dom';
import CategoryMenuDropdown from './Dropdown';
import CategoryMenuCreatePost from './CreatePost';

const Menu = styled.nav`
  display: block;
  border-left: none;
  border-right: none;
  ${props => props.token && `margin-bottom: 16px`};
`;

const CategoryMenu = props => (
  <Menu token={props.token ? true : false}>
    {props.token && <CategoryMenuCreatePost />}
  </Menu>
);

export default CategoryMenu;
