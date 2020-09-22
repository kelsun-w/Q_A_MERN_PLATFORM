import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 500;
`

const Member = ({ number }) => {
    return (
        <Wrapper>
            <span>{number} Members</span>
        </Wrapper>
    )
};

export default Member;