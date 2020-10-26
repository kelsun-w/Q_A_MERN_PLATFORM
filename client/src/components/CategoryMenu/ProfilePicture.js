import styled from 'styled-components';
import React from 'react';
import { transition } from '../shared/helpers';

const DP = styled.img`
    border-radius: 100%;
    margin-right: 5px;
    max-height: 45px;
    max-width: 45px;
    border: 1.5px solid #ddd;
    margin-right: 8px;

    ${transition('transform')};
`

const Picture = ({ user }) => {
    const IMG_URL = user && user.picture ? `${process.env.REACT_APP_IMG_URL_UA}/${user.id}` : `${process.env.PUBLIC_URL}/images/userprofile.png`;

    return <DP src={IMG_URL} />
};

export default Picture;