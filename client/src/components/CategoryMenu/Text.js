import styled from 'styled-components';
import { transition, wideFont, overflow } from '../shared/helpers';

const Header = styled.span`
    ${wideFont};
    ${overflow};
    z-index: 1;
    font-size: 18px;
    color: rgba(0,0,0,0.9);
    
    ${transition('transform')};
`

const SubHeader = styled.span`
    ${overflow};
    z-index: 1;
    font-size: 16px;
    color: rgba(0,0,0,0.6);
    
    ${transition('transform')};
`

export {
    Header,
    SubHeader
}