import React from 'react';
import styled from 'styled-components/macro';
import Comment from '../Component';

const Item = styled.li`
  margin-bottom: 2px;
`;

const CommentListItem = props => (
  <Item>
    <Comment {...props} subComment={true} />
  </Item>
);

export default CommentListItem;
