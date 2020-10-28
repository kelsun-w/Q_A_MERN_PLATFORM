import styled from 'styled-components';
import {
    smallFont,
    normalFont,
    overflow,
    link
} from '../../shared/helpers';

export const PanelWrapper = styled.div`
    padding: 8px;
    ${normalFont};
    color: ${props => props.theme.normalText};
`;

export const StyledImage = styled.img`
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: #fff;
`;

export const FlexProfile = styled.div`
    flex: 0 0 220px;
    min-width: 220px;
`;

export const FlexDate = styled.div`
    ${smallFont};
    font-weight: lighter;
    color: #ccc;
`;

export const FlexCommand = styled.button`
    ${link};
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    :hover,
    :focus{
        color: ${props => props.theme.accent};
    }
`;

export const StyledAnchor = styled.a`
    ${normalFont};
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 4px 8px 4px 4px;
    border-radius: 4px;
    color: ${props => props.theme.normalText};

    & > :first-child {
        margin-right: 5px;
    };

    :hover,
    :focus {
        background-color: ${props => props.theme.hover};
    }
`;