import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { transition } from '../../../shared/helpers';

const FooterButton = styled(Link)`
  ${transition('background-color')};
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 3px;
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
  
  :hover, :focus{
    outline: 0;
    background-color: ${props => props.theme.voteButtonHover};
  }

  @media(max-width: 768px){
      padding: 0 4px;
      border : 1.5px solid ${props => props.theme.border};
      border-radius: 20px;
   
      :hover, :focus{
        background-color: transparent;
      }
  } 
`

export default FooterButton;