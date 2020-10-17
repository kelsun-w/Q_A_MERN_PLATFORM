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

const Picture = (props) => (
    <DP src={`${process.env.REACT_APP_IMG_URL_UA}/${props.user.id}`} />
)

export default Picture;