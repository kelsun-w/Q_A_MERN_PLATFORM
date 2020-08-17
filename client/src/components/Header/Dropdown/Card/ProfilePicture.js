import styled from 'styled-components';
import React from 'react';

const DP = styled.img`
    border-radius: 4px;
    margin-right: 5px;
    max-height: 24px;
    max-width: 24px;
`

const Picture = (props) => (
    <DP src={process.env.PUBLIC_URL + '/images/default_dp.jpg'} />
)

export default Picture;