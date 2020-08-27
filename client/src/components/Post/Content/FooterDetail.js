import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { link } from '../../shared/helpers';
import CommentIcon from '../../shared/icons/comments';
import ReportIcon from '../../shared/icons/report';
import { transition } from '../../shared/helpers';

const FooterButton = styled(Link)`
  ${transition('background-color')};
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 3px;
  width: auto;
  padding: 2px;
  background-color: transparent;
  cursor: pointer;

  * {
    margin-right: 3px;
  }

  span {
    color: ${props => props.theme.mutedText};
    font-weight: 500;
  }

  :hover, :focus {
    outline: 0;
    background-color: ${props => props.theme.voteButtonHover};
  }
`

const Wrapper = styled.div`
  display: flex;
  font-size: 13px;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > * {
    margin-right: 2px;
  }

  & > a {
    ${link};
  }
`;

const PostContentDetail = props => (
  <Wrapper>
    <FooterButton to={`/a/${props.category}/${props.id}`} onMouseDown={(e) => e.preventDefault()}>
      <CommentIcon />
      <span>{props.commentCount} comment{props.commentCount !== 1 ? 's' : null}</span>
    </FooterButton>
    <FooterButton to={`/a/${props.category}/${props.id}`} onMouseDown={(e) => e.preventDefault()}>
      <ReportIcon />
      <span>Report</span>
    </FooterButton>
  </Wrapper>
);

export default PostContentDetail;
