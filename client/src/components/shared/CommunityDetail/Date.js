import React from 'react';
import styled from 'styled-components';
import { smallFont } from '../helpers';

const Wrapper = styled.span`
    ${smallFont};
    display: block;
    font-size: 13px;
    margin: auto;
`

const CreatedDate = ({ date }) => {
    const ISOdate = new Date(date);
    return (
        <Wrapper>
            <span>Created on </span>
            <span>{ISOdate.getDate() + '-' + (ISOdate.getMonth() + 1) + '-' + ISOdate.getFullYear()}</span>
        </Wrapper>
    )
}

export default CreatedDate;