import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    background-color: rgba(0,0,0,0.4);
`

const ModalWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 5px 10px;
    background-color: ${props => props.theme.foreground};
    border-radius: 12px 12px 0 0;
`

const ModalClose = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 5px 10px;
    font-size: 22px;
    color: ${props => props.theme.icon}; 
    cursor: pointer;
`

export const ModalItem = styled(Link)`
    display: block;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
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
            <ModalWrapper ref={modal}>
                <ModalClose ref={closeBtn} onClick={closeModal}><FontAwesomeIcon icon='times' /></ModalClose>
                {children}
            </ModalWrapper>
        </ModalOverlay>
    );
}
