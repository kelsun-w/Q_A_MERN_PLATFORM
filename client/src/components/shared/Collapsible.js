import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 8px 0;
    color: ${props => props.theme.normalText};
`;

const Collapsible = styled.div`
    display: flex;
    align-items:center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    width:100%;
    word-break: break-word;
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
    display: ${({ show }) => show ? 'block' : 'none'};
    font-size: 12px;
    font-weight: 400;
    word-break: break-word;
    margin-top: 6px;
`;

const Collapse = (props) => {
    const [isOpen, setOpen] = useState(false);

    const toggleContent = event => {
        setOpen(!isOpen);
    };

    return (
        <Wrapper>
            <Collapsible show={isOpen} onClick={toggleContent} >{props.title}</Collapsible>
            <Content show={isOpen}>{props.content}</Content>
        </Wrapper>
    );
}


export default Collapse;
