import React from 'react';
import styled from 'styled-components/macro';
import CommentListItem from './Item';

const List = styled.ul`
  margin-top: 8px;
  list-style: none;
  background-color: ${props => props.theme.shadow};
  padding: 12px 16px 2px 0px;
`;

const mapComments = comments =>
  comments.map((comment, index) => (
    <CommentListItem key={index} {...comment} />
  ));

const sortComments = comments =>
  comments.sort((a, b) => b.score - a.score);

const CommentList = ({ comments }) =>
  comments && <List>{mapComments(sortComments(comments))}</List>;

export default CommentList;
