import styled from 'styled-components/macro';
import { transition, wideFont } from './helpers';

const Button = styled.button.attrs({
  allcaps: true
})`
  ${transition('filter', 'box-shadow', 'background-color')};
  ${wideFont};
  
  border: none;
  border-radius: 3px;
  padding: 8px 24px;
  background-color: ${props => props.danger ? props.theme.danger : props.theme.accent};
  cursor: pointer;
  color: #ffffff;
  outline: none;
  
  :hover {
    filter: brightness(110%);
  }
  
  :active {
    filter: brightness(90%);
  }
  
  :focus {
    box-shadow: 0 0 0 2px ${props => props.theme.accent + '4d'};
  }
`;

export default Button;
