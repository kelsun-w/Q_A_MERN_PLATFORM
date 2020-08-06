import styled from 'styled-components/macro';

const Header = styled.label`
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.normalText};
  
  @media (max-width: 425px) {
    font-size: 20px;
  }
`;

export default Header;