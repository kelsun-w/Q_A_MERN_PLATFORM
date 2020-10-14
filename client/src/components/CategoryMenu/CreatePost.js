import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import { Header, SubHeader } from './Text';
import { transition } from '../shared/helpers';

const Wrapper = styled(Link)`
  display: block;
  position: relative;
  text-decoration:none;
  height: 75px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  
  :hover,
  :focus  {
    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.6);
    outline: none;
    
    img:nth-child(1){
      transform: translateX(0.2vw);
    }

    img:nth-child(2){
      transform: translateX(-0.4vw);
      filter: blur(0.25px);
    }

    span {
      transform: translateX(0.3vw);
    }
  } 

  
  @media (max-width: 410px){
    span:nth-child(1){
        font-weight: bolder;
        color: rgba(0,0,0,0.6);
    }
    span:nth-child(2){
        display: none;
    }

    img:nth-child(1){
      display:none;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 10px;
    border-radius: 0;
    img:nth-child(2){
      right: 3vw;
    }
  }
`

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`

const BGImage = styled.img`
  position: absolute;
  right: 0;
  top:0;
  bottom:0;
  max-height: 100%;
  
  ${transition('transform')};

  :focus {
    outline: none;
    border: 0;
  }
`

const CategoryMenuCreatePost = (props) => (
  <Wrapper to='/createpost'>
    <RowWrapper>
      <ProfilePicture user={props.user} />
      <ColumnWrapper>
        <Header>Create Post</Header>
        <SubHeader>Ask a question or share something interesting</SubHeader>
      </ColumnWrapper>
    </RowWrapper>
    <BGImage src={process.env.PUBLIC_URL + '/images/group-cropped.jpg'} />
  </Wrapper>
);

export default CategoryMenuCreatePost;
