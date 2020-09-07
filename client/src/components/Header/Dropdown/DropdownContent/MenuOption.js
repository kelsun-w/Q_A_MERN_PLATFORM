import styled, { css } from 'styled-components';
import React from 'react';
import { NormalText } from '../Text';
import { Link } from 'react-router-dom';
import ToggleButton from '../../../shared/ToggleButton';

const Wrapper = styled(Link)` 
    display: flex;
    position: relative;
    align-items: center;
    padding: 8px 10px 8px 12px;
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.icon};
    
    & svg {
        &:first-child{
            margin-right: 10px;
        }
    };

    &:hover{
        background: ${props => props.theme.accent};
        
        * { color: #ffffff; }
    };

    &:focus{
        outline: none;
        background: ${props => props.theme.accent};
        
        * { color: #ffffff; }
    };

    ${({ overflow }) => overflow && css`
        display: none;

        @media (max-width:600px) {
            display: flex;
        };
    `}
`;

const Text = styled(NormalText)`
    font-weight: 600;
`;

const MenuOption = ({ children, destination, overflow, toggle, onClick, defaultState }) => (
    // preventing `onMouseDown` makes the NavLink not get the :focus on mouse click
    <Wrapper to={destination} overflow={overflow} onClick={onClick} onMouseDown={(e) => e.preventDefault()}>
        {children[0]}
        <Text>{children[1]}</Text>
        {toggle ? <ToggleButton defaultState={defaultState} /> : ""}
    </Wrapper>
);

export default MenuOption;
