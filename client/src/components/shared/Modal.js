import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 90;
    background-color: rgba(28,28,28,0.9);
    width: 100%;
    height:100%;
`

const PositionWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    width:100%;
    height: 100%;
`

const ModalWrapper = styled.div`
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    margin: auto;
    padding: 20px 26px;
    min-width: 400px;
    max-width: 550px;
    border: 1px solid #343536;
    border-radius: 4px;
    background-color: ${props => props.theme.foreground};
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
`

const ModalClose = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 5px 10px;
    font-size: 18px;
    color: ${props => props.theme.icon}; 
    cursor: pointer;    
`

export const ModalItem = styled(Link)`
    display: block;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    word-break: break-word;
    color: ${props => props.theme.normalText};
    text-decoration: none;

    svg {
        color: ${props => props.theme.icon};
    }
`

export const Modal = ({ isOpen, onClose, children }) => {
    const modal = useRef(null);
    const closeBtn = useRef(null);

    const closeModal = event => {
        if (!modal.current.contains(event.target) || closeBtn.current.contains(event.target)) {
            onClose(event);
            document.removeEventListener('click', closeModal);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', closeModal);
        }
        return () => {
            document.removeEventListener('click', closeModal);
        }
    });

    return (
        <ModalOverlay>
            <PositionWrapper >
                <ModalWrapper ref={modal} >
                    <ModalClose ref={closeBtn} onClick={closeModal}><FontAwesomeIcon icon='times' /></ModalClose>
                    {children}
                </ModalWrapper>
            </PositionWrapper>
        </ModalOverlay>
    );
}
