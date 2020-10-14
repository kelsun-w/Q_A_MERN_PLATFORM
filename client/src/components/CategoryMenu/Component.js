import React from 'react';
import styled from 'styled-components/macro';
import CategoryMenuCreatePost from './CreatePost';

const Menu = styled.nav`
  display: block;
  border-left: none;
  border-right: none;
  ${props => props.token && `margin-bottom: 16px`};
`;

const CategoryMenu = props => (
  <Menu token={props.token ? true : false}>
    {props.token && <CategoryMenuCreatePost user={props.user} />}
  </Menu>
);

export default CategoryMenu;
