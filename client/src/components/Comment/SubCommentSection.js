import React from 'react';
import SubCommentList from './SubCommentList';

const CommentReplySection = ({ children, parentId }) => (
  <>
    {!children || children.length === 0 ? (
      null
    ) : (
        <SubCommentList comments={children} parentId={parentId}/>
      )}
  </>
);

export default CommentReplySection;
