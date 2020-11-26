import React, { useState } from 'react';
import styled from 'styled-components/macro';
import CommentDetailContainer from './Detail/Container';
import CommentContent from './Content';
import ProfilePicture from './ProfilePicture';
import SubCommentSection from './SubCommentSection';
import ReplyButton from './ReplyButton';
import ReplyForm from './ReplyForm/Container';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = styled.div`
  display: flex;
`;

const CommentBody = styled.div`
  flex: 2;
  background-color: ${props => props.theme.foreground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 10px 0 0 10px;
  }
`;

const ReplyFormWrapper = styled.div`
  width: 100%;
`;

Comment = ({ id, body, subComment, postid, ...details }) => {
  const [hidden, toggleHidden] = useState(true);
  return (
    <Wrapper>
      <CommentWrapper>
        <ProfilePicture user={details} />
        <ReplyFormWrapper>
          <CommentBody>
            <CommentDetailContainer {...details} id={id} subComment={subComment} />
            <CommentContent>{body}</CommentContent>
            {!subComment && <ReplyButton onClick={() => toggleHidden(!hidden)} />}
          </CommentBody>
          {!hidden && <ReplyForm id={postid} parentId={id} toggleCallback={() => toggleHidden(!hidden)}/>}
        </ReplyFormWrapper>
      </CommentWrapper>
      <SubCommentSection {...details} parentId={id}/>
    </Wrapper>
  );
};
export default Comment;
