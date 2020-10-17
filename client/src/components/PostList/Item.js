import React from 'react';
import styled, { css } from 'styled-components/macro';
import Post from '../Post';

const Item = styled.li`

  border: ${props => props.noBorder ? `none` : `1px solid ${props.theme.border}`};
  border-radius: 4px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

const PostListItem = props => (
  <Item noBorder={props.noBorder} >
    <Post {...props} />
  </Item>
);

export default PostListItem;
