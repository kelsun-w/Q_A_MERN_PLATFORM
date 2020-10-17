import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  position: relative;
  flex: 2;
  align-items: center;
  display: flex;
  border: 1px solid #ddd;
  height: 36px;
  max-width: 400px;
  min-width: 120px;
  border-radius: 2.5px;
  outline: none;
  padding: 0 16px 0 10px;
  margin-right: 8px;
  align-self: center;
  background-color: ${props => props.theme.inputBackground};

  &:hover , &:focus{
    border: 1px solid ${props => props.theme.accent};
  }
`;

const StyledLabel = styled.label`
  margin-right: 5px;
  color: ${props => props.theme.icon};
`;

const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 2.5px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.normalText};
  &:hover , &:focus{
    outline: none;
  }
`

const SearchBar = (props) => {

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (event.target.value.length !== 0) {
        props.history.push(`/search/${event.target.value}`);
      }
    }
  };

  return (
    <Wrapper>
      <StyledLabel>
        <FontAwesomeIcon icon='search' />
      </StyledLabel>
      <StyledInput type='search'
        placeholder='Search'
        autoComplete='off'
        onKeyDown={handleKeyDown}
      />
    </Wrapper>
  )
}

export default SearchBar;