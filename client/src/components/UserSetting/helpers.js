import styled from 'styled-components'
import { smallFont } from '../shared/helpers';
import Header from '../shared/Header';

export const SubHeading = styled(Header).attrs({ noBorder: true, small: true, light: true })`
    margin-bottom: 24px;    
`;

export const StyledList = styled.ul`
    text-decoration: none;
    ${smallFont};
`

export const StyledListItem = styled.li`
    display:flex;
    align-items: center;
    margin-bottom: 6px;
    & > :first-child{
        margin-right: 8px;
    }
`