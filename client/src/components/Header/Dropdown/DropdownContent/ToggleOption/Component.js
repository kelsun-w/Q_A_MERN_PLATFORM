import styled, { css } from 'styled-components';
import React from 'react';
import { normalFont, overflow } from '../../../../shared/helpers';
import { Link } from 'react-router-dom';
import { Form, Field } from 'redux-form';
import ToggleButton from '../../../../shared/ToggleButton';

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

const Text = styled.span`
    ${normalFont};
    color: ${props => props.theme.normalText};
`;

const MenuOption = ({ children, destination, overflow, handleToggle, defaultState }) => (
    // preventing `onMouseDown` makes the NavLink not get the :focus on mouse click
    <Wrapper to={destination} overflow={overflow} onClick={handleToggle} onMouseDown={(e) => e.preventDefault()}>
        {children[0]}
        <Text>{children[1]}</Text>
        <Form>
            <Field
                type='radio'
                component={renderField}
                defaultState={defaultState}
                handleChange={handleToggle} />
        </Form>
    </Wrapper>
);

export default MenuOption;
