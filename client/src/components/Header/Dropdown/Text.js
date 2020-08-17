import styled from 'styled-components/macro';
import { smallFont, wideFont, overflow } from '../../shared/helpers';

export const NormalText = styled.span`
  ${wideFont};
  ${overflow};
  color: ${props => props.theme.normalText};
`;

export const MutedText = styled.span`
  ${smallFont};
  ${overflow};
  color: ${props => props.theme.mutedText};
`;


