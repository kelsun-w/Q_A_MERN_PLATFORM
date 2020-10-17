import { NormalText, MutedText } from '../Text';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    max-width: 180px;
    min-width: 180px;
    
    @media (max-width: 768px) {
        display: none;
    }
`

const Detail = props => (
    <Wrapper>
        <NormalText>{props.user.username}</NormalText>
        <MutedText>{`${props.user.score} point${props.user.score >= -1 && props.user.score <= 1 ? '' : 's'}`}</MutedText>
    </Wrapper>
)

export default Detail;