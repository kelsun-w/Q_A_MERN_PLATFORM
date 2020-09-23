import React from 'react';
import styled from 'styled-components/macro';
import NavLink from '../../shared/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { overflow } from '../../shared/helpers';

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  ${overflow};
  padding: 6px 10px;
  font-size: 14px;
  font-weight: 500;
  width: 240px;
  text-decoration: none;
  color: ${props => props.theme.normalText};
  border: 1.5px solid ${props => props.theme.border};
  border-radius: 8px;
  margin-bottom: 4px;
  background-color: ${props => props.theme.foreground};

  :hover, :focus {
    outline: 0;
    background-color: ${props => props.theme.activeBackground};
    color: ${props => props.theme.accent};
  }
`;

const ItemIcon = styled.img`
    margin-right: 8px;
    width: 16px;
    height: 16px;
    object-fit: cover;
    border: 0.1px solid #ddd;
    border-radius: 20%;
    background-color: #fff;
`

const DefaultIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  color : ${props => props.theme.icon};
`;

const SidebarCategoryListItem = ({ category, logo }) => {
  const isAll = category === 'all';
  const isDiscover = category === 'discover more';
  const route = isAll ? '/' : isDiscover ? '/community/discover' : `/c/${category}`;

  return (
    <Item exact={isAll} to={route}>
      {isAll || isDiscover ? <DefaultIcon icon={logo} /> : <ItemIcon src={logo} />}
      {category}
    </Item>
  );
};

export default SidebarCategoryListItem;
