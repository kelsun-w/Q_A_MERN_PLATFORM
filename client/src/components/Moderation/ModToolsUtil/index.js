import styled from 'styled-components';
import { overflow, smallFont, normalFont } from '../../shared/helpers';

export const ModToolHead = styled.div`
    ${overflow};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-flow: row wrap;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background: ${props => props.theme.activeBackground};
    & > *:not(:last-child) {
        margin-right: 16px;
    }
`;

export const ModToolHeadItem = styled.span`
    & > * {
        ${smallFont};
        ${overflow};

        & > :first-child{
            margin-right: 6px;
        }
    }
`

export const ModToolBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px;
    width: 100%;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.activeBackground};
    
    & > *:not(:last-child) {
        margin-bottom: 6px;
    }
`;

export const ModToolBodyItem = styled.div`
    ${normalFont};
    ${overflow};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 6px 16px 6px 8px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.foreground};

    & > * > svg {
        fill: ${props => props.theme.icon}
    }
`;