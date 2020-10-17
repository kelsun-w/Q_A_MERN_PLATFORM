import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { smallFont, normalFont, overflow } from '../shared/helpers';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 8px 0;
    color: ${props => props.theme.normalText};
`;

const Collapsible = styled.div`
    ${normalFont};
    word-break: break-word;
    display: flex;
    align-items:center;
    cursor: pointer;
    width:100%;
    padding-right: 20px;

    ::after {
       content: ' ';
       display: block;
       position: absolute;
       right: 5px;
       width: 6px;
       height: 6px;
       transform: rotate(-45deg);
       ${({ show }) => (show ? css` 
            border-top: 1px solid ${props => props.theme.icon};
            border-right: 1px solid ${props => props.theme.icon};
            `
        :
        css`
            border-bottom: 1px solid ${props => props.theme.icon};
            border-left: 1px solid ${props => props.theme.icon};
            `)
    }          
    }
`;

const Content = styled.div`
    ${smallFont};
    word-break: break-word;
    display: ${({ show }) => show ? 'block' : 'none'};
    margin-top: 6px;
`;

const Collapse = (props) => {
    const [isOpen, setOpen] = useState(false);

    const toggleContent = event => {
        setOpen(!isOpen);
    };

    return (
        <Wrapper>
            <Collapsible show={isOpen} onClick={toggleContent} light>{(props.index + 1)}. {props.title}</Collapsible>
            <Content show={isOpen} light>{props.content}</Content>
        </Wrapper>
    );
}


export default Collapse;
