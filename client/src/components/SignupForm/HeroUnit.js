import React from 'react';
import styled from 'styled-components';

//Icon SVG
import UpvoteIcon from '../shared/icons/splash-upvote';
import ShareIcon from '../shared/icons/splash-megaphone';
import AwardIcon from '../shared/icons/splash-award';
import QAIcon from '../shared/icons/splash-qa';
import SocialIcon from '../shared/icons/splash-camera';


const HeroUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;
  /* background: gold; */
  max-width: 400px;
  flex-grow: 2;
  margin-right: 20px;
  padding: 32px 44px;
  color: ${props => props.theme.normalText};

  @media (max-width: 800px) {
    display: none;
  } 
`

const HeroTitle = styled.h1`
  display: flex;
  margin-bottom: 32px;
`

const HeroContent = styled.div`
  font-size: 14px;
  display: flex;
  margin-bottom: 24px;
  overflow: hidden;
  & SVG {
    margin-right: 5px;
  }
`

const Hero = () => (
    <HeroUnit>
        <HeroTitle>Join the MFU Life Community</HeroTitle>
        <HeroContent><QAIcon />Got a problem? <br />Ask question and let other's help you</HeroContent>
        <HeroContent><UpvoteIcon />Join discussions — vote,comment</HeroContent>
        <HeroContent><AwardIcon />Help others and gain recognition</HeroContent>
        <HeroContent><SocialIcon />Find people with similar interests</HeroContent>
        <HeroContent><ShareIcon />Share interesting stuffs with others</HeroContent>
    </HeroUnit>
);

export default Hero;