import React from 'react';
import styled, { css } from 'styled-components/macro';
import ProfilePicture from './ProfilePicture';
import { Link } from 'react-router-dom';
import { normalFont, link } from '../shared/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../shared/Button';

const Wrapper = styled.div`
  padding: 4px 32px 4px 16px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: ${props => props.theme.foreground};
  color: ${props => props.theme.normalText};

  @media (max-width: 768px) {
    padding: 8px 10px;
    border-radius: 0;
  }
`

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 4px 0;
  }
`

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  background-color: ${props => props.theme.inputBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  ${normalFont};
  padding: 4px 8px;
`

const StyledLink = styled(Link)`
  ${link};
  ${({ WIDE }) => WIDE ? `width: 100%` : ``};
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.normalText};
  background-color: ${props => props.theme.activeBackground};
  border: 1px solid ${props => props.theme.border};
  min-width: 100px;
  margin: 0 5px;
  padding: 6px 12px;
  ${normalFont};
  font-size: 14px;
  & > :first-child {
    font-size: 18px;
    margin-right: 5px;
    color: ${props => props.theme.icon};
  };

  :hover,
  :focus{
      box-shadow: 0 0 0 0.5px ${props => props.theme.invert + '4d'};
  }
`;

const INPUT_TEXT = `What's your question?`;

const CategoryMenuCreatePost = (props) => (
  <Wrapper>
    <ColumnWrapper>
      <RowWrapper>
        <ProfilePicture user={props.user} />
        <StyledLink WIDE to='/createpost/text'>
          <StyledInput placeholder={INPUT_TEXT} />
        </StyledLink>
      </RowWrapper>
      <RowWrapper>
        <StyledLink to='/createpost/text'>
          <StyledButton >
            <FontAwesomeIcon icon='comment' />
            <span>Create a Text Post</span>
          </StyledButton>
        </StyledLink>
        <StyledLink to='/createpost/link'>
          <StyledButton>
            <FontAwesomeIcon icon='link' />
            <span>Post a Link</span>
          </StyledButton>
        </StyledLink>
      </RowWrapper>
    </ColumnWrapper>
  </Wrapper>
);

export default CategoryMenuCreatePost;
