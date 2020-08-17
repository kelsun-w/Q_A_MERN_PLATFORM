import styled, { css } from 'styled-components';
import React from 'react';
import { NormalText } from '../Text';
import { NavLink } from 'react-router-dom';
import ToggleButton from '../../../shared/ToggleButton';

const Wrapper = styled(NavLink)` 
    display: flex;
    position: relative;
    align-items: center;
    padding: 8px 10px 8px 12px;
    cursor: pointer;
    text-decoration: none;

    & svg {
        width: 20px;
        height: 20px;
      
        &:first-child{
            margin-right: 10px;
        }
    };

    &:hover, &:focus {
        background: ${props => props.theme.accent};
        
        * { color: #ffffff; }
        svg { fill: #ffffff; }
    };

    &:focus { 
        outline: none; 
    }

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
    <Wrapper to={destination} overflow={overflow} onClick={onClick}>
        {children[0]}
        <Text>{children[1]}</Text>
        {toggle ? <ToggleButton defaultState={defaultState} /> : ""}
    </Wrapper >
);

export default MenuOption;
