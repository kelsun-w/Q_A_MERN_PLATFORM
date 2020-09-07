import React from 'react';
import styled from 'styled-components/macro';
import PostVoteContainer from '../../Vote/Container';
import { overflow } from '../../../shared/helpers';
import FooterButton from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Be careful when editing this code. The order of the child elements of the Wrapper MATTERS!
const Wrapper = styled.div`
  ${overflow};
  display: flex;
  font-size: 13px;
  margin-top: auto;

  @media(max-width: 768px){
    & > * :not(:nth-child(1)) :not(:nth-child(2)) :not(:nth-child(3)){
      display: none;
    }
    
    & > :nth-child(3){
      margin: auto;
      margin-right: 0;
      height: 100%;
      width: auto;
      border-radius: 100%;
    }

    & > a :nth-child(2) > span :not(:nth-child(2)) {
      display : none;
    }

    & > a :not(:nth-child(2)) >span {
      display : none;
    }
  }  

  & > * {
    margin-right: 8px;
  }

  & > a {
    text-underline-position: under;
    text-decoration: none;
  }
`;

const PostContentDetail = ({ id, votes, score, category, commentCount }) => (
  <Wrapper>
    <PostVoteContainer row id={id} votes={votes} score={score} />
    <FooterButton to={`/a/${category}/${id}`} >
      <FontAwesomeIcon icon='comment-alt' />
      <span>{commentCount}</span>
      <span>comment{commentCount !== 1 ? 's' : null}</span>
    </FooterButton>
    <FooterButton className="share" to={`/a/${category}/${id}`} >
      <FontAwesomeIcon icon='share' />
      <span>Share</span>
    </FooterButton>
    <FooterButton to={`/a/${category}/${id}`} >
      <FontAwesomeIcon icon='bookmark' />
      <span>Save</span>
    </FooterButton>
    <FooterButton to={`/a/${category}/${id}`} >
      <FontAwesomeIcon icon='flag' />
      <span>Report</span>
    </FooterButton>
  </Wrapper>
);

export default PostContentDetail;
