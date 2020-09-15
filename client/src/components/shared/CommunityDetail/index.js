import React from 'react'
import styled from 'styled-components';
import Divider from '../Divider';
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

const MainDetail = (props) => {
    const alreadyJoined = props.communities
        && (props.communities.find(c => c.name === props.name)) != null;

    return (
        <Wrapper>
            <Header>
                <FontAwesomeIcon icon='hand-holding-heart' />
                <span>{props.name}</span>
            </Header>
            <Description>
                {props.description}
            </Description>
            <MemberNumber number={props.members} />
            <Divider />
            <CreatedDate date={props.created} />
            {props.user && <JoinButton onClick={props.onClick} joined={alreadyJoined} />}
        </Wrapper>
    );
}
export default MainDetail;