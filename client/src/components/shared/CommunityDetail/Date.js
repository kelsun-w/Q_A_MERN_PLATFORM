import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
    display: block;
    font-size: 16px;
    font-weight: 500;
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