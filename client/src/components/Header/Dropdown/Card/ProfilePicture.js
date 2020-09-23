import styled from 'styled-components';
import React from 'react';

const DP = styled.img`
    border-radius: 4px;
    margin-right: 5px;
    height: 24px;
    width: 24px;
    object-fit: cover;
    background-color: #fff;
`

const Picture = ({ imageUrl }) => (
    <DP src={imageUrl} />
);

export default Picture;