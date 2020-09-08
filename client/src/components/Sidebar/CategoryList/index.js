import React from 'react';
import styled from 'styled-components/macro';
import SidebarCategoryListItem from './Item';
import categories from '../../../categories';

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const mapCategories = categories =>
  categories.map((category, index) => (
    <SidebarCategoryListItem key={index} category={category} icon='hand-holding-heart'/>
  ));

const SidebarCategoryList = () => (
  <CategoryList>
    {mapCategories(['all', ...categories])}
    <SidebarCategoryListItem category='discover more' icon='plus'/>
  </CategoryList>
);

export default SidebarCategoryList;
