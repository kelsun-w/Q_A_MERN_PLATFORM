import styled from 'styled-components';
import React from 'react';
import { transition } from '../shared/helpers';

const DP = styled.img`
    margin: 4px 6px 0 12px;
    width: 52px;
    height: 52px;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.foreground};
    ${transition('transform')};

    @media (max-width: 768px) {
        margin: 4px 4px 0px;
        width: 45px;
        height: 45px;
    }
`

const ProfilePicture = ({ user: { author } }) => {
    const IMG_URL = author && author.picture ? `${process.env.REACT_APP_IMG_URL_UA}/${author.id}` : `${process.env.PUBLIC_URL}/images/userprofile.png`;

    return <DP src={IMG_URL} />
};

export default ProfilePicture;