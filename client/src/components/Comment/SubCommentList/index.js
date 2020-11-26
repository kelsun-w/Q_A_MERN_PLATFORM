import React from 'react';
import styled from 'styled-components/macro';
import CommentListItem from './Item';

const List = styled.ul`
  margin-left: 2em;
  margin-top: 4px;
  list-style: none;
`;

const mapComments = (comments, parentId) =>
  comments.map((comment, index) => (
    <CommentListItem key={index} {...comment} parentId={parentId} />
  ));

const sortComments = comments =>
  comments.sort((a, b) => new Date(a.created) - new Date(b.created));

const CommentList = ({ comments, parentId }) =>
  comments && <List>{mapComments(sortComments(comments), parentId)}</List>;

export default CommentList;
