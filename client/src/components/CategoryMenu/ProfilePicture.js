import styled from 'styled-components';
import React from 'react';
import { transition } from '../shared/helpers';

const DP = styled.img`
    border-radius: 100%;
    margin-right: 5px;
    max-height: 45px;
    max-width: 45px;
    border: 1.5px solid #ddd;

    ${transition('transform')};
`

const Picture = (props) => (
    <DP src={process.env.PUBLIC_URL + '/images/default_dp.jpg'} />
)

export default Picture;