import React from 'react';
import styled from 'styled-components';
import { smallFont } from '../helpers';

const Wrapper = styled.span`
    ${smallFont}; 
    font-size: 13px;
`

const Member = ({ number }) => {
    return (
        <Wrapper>
            <span>{number} Members</span>
        </Wrapper>
    )
};

export default Member;