import React from 'react'
import styled from 'styled-components';
import Divider from '../../../shared/Divider';
import Header from './Header';
import MemberNumber from './Member';
import CreatedDate from './Date';
import JoinButton from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 260px;
    padding: 8px 12px;
    color: ${props => props.theme.normalText};
    background-color: ${props => props.theme.foreground};
    border: 1px solid ${props => props.theme.border};
    border-radius: 2px;

    & > * {
        margin-bottom: 8px;
    }
`

const Description = styled.div`
    font-size: 14px;
`

const MainDetail = () => (
    <Wrapper>
        <Header>
            <FontAwesomeIcon icon='hand-holding-heart' />
            <span>Music</span>
        </Header>
        <Description>
            Lorem Ipsum Doler toleeee Lorem Ipsum Doler toleeee Lorem Ipsum Doler toleeee Lorem Ipsum Doler toleeee Lorem Ipsum Doler 
        </Description>
        <MemberNumber number='20' />
        <Divider />
        <CreatedDate date='Dec 10 1999' />
        <JoinButton />
    </Wrapper>
);

export default MainDetail;