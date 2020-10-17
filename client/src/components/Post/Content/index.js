import React from 'react';
import styled from 'styled-components/macro';
import PostContentTitle from './Title';
import PostContentPreview from './Preview';
import PostContentFullText from './FullText';
import PostContentHeaderDetail from './Header/Container';
import PostContentFooterDetail from './Footer/Container';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;
  min-width: 0;
`;

const renderContent = props => {
  switch (props.type) {
    case 'link':
      return <PostContentPreview>{props.url}</PostContentPreview>;

    case 'text':
      if (props.showFullPost) {
        return <PostContentFullText>{props.text}</PostContentFullText>;
      }
      return <PostContentPreview>{props.text}</PostContentPreview>;

    default:
      break;
  }
};

const PostContent = ({
  url,
  title,
  type,
  text,
  commentCount,
  showFullPost,
  id,
  votes,
  score,
  ...details
}) => (
    <Wrapper>
      <PostContentHeaderDetail postid={id} {...details} />
      <PostContentTitle
        url={url}
        title={title}
        type={type}
        full={showFullPost}
        {...details}
        id={id}
      />
      {renderContent({ type, url, text, showFullPost })}
      <PostContentFooterDetail postid={id} title={title} text={text} votes={votes} score={score} commentCount={commentCount} {...details} />
    </Wrapper>
  );

export default PostContent;
