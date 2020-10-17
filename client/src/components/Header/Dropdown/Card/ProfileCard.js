import React from 'react';
import styled, { css } from 'styled-components';
import ProfileDetail from './ProfileDetail';
import ProfilePicture from './ProfilePicture';

const active = () => css`
    padding: 3px 3px;
    border: 1.5px solid ${props => props.theme.border};
    border-radius: 4px;
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
    
    ::after {
        border-bottom: 2px solid ${props => props.theme.accent};
        border-right: 2px solid ${props => props.theme.accent};
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 4.5px;
    cursor: pointer;
    min-width: 50px;
    
    ::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        -webkit-transform: translate(-100%,calc(-50% - 2px)) rotate(45deg);
        -ms-transform: translate(-100%,calc(-50% - 2px)) rotate(45deg);
        transform: translate(-100%,calc(-50% - 2px)) rotate(45deg);
        border-bottom: 2px solid ${props => props.theme.mutedText};
        border-right: 2px solid ${props => props.theme.mutedText};
        width: 6px;
        height: 6px;
        pointer-events: none;
    }

    ${props => props.active ? active : null};

    &:hover {
        ${active};
    };

`

const Card = ({ user, onClick, active }) => {
    const IMG_URL = user && user.picture ? `${process.env.REACT_APP_IMG_URL_UA}/${user.id}` : `${process.env.PUBLIC_URL}/images/userprofile.png`;
    return (
        <Wrapper onClick={onClick} active={active}>
            <ProfilePicture imageUrl={IMG_URL} />
            {user && <ProfileDetail user={user} />}
        </Wrapper>
    )
};

export default Card;