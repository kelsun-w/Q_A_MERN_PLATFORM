import styled from 'styled-components/macro';
import { smallFont } from '../helpers';

const Label = styled.label.attrs({
  light: true
})`
  ${smallFont};

  display: block;
  color: ${props => props.theme.mutedText};
`;

export default Label;
