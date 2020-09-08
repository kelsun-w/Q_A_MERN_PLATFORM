import React from 'react';
import styled from 'styled-components/macro';
import NavLink from '../../shared/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import categories from '../../../categories';

const Item = styled(NavLink)`
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  text-decoration: none;
  color: ${props => props.theme.normalText};
  border: 1.5px solid ${props => props.theme.border};
  border-radius: 20px;
  margin-bottom: 4px;
  background-color: ${props => props.theme.foreground};

  :hover, :focus {
    outline: 0;
    background-color: ${props => props.theme.activeBackground};
    color: ${props => props.theme.accent};
  }
`;

const ItemIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  color : ${props => props.theme.icon};
`;

const SidebarCategoryListItem = ({ category, icon }) => {
  const isAll = category === 'all';
  const isDiscover = category === 'discover more';
  const route = isAll ? '/' : isDiscover ? '/circles/discover' : `/a/${category}`;

  return (
    <Item exact={isAll} to={route}>
      <ItemIcon icon={icon} />
      {category}
    </Item>
  );
};

export default SidebarCategoryListItem;
