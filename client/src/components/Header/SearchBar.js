import styled from 'styled-components'

const SearchBar = styled.input`
  flex:2;
  
  border: 1px solid #ddd;
  height: 36px;
  width: 100%;
  min-width: 120px;
  border-radius: 2.5px;
  outline: none;
  padding: 0 16px 0 10px;
  margin-right: 8px;
  align-self: center;
  

  &:hover , &:focus{
    border: 1px solid ${props => props.theme.accent};
  }
`

export default SearchBar;