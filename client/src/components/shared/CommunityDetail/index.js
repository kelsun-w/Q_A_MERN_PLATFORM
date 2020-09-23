import React from 'react'
import styled from 'styled-components';
import Divider from '../Divider';
import Title from './Header';
import MemberNumber from './Member';
import CreatedDate from './Date';
import JoinButton from './Button';

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

const Logo = styled.img`
    border-radius: 100%;
    border: 0.5px solid #ddd;
    margin-right: 5px;
    height: 38px;
    width: 38px;
    object-fit: cover;
    background-color: #fff;
`

const MainDetail = (props) => {
    const alreadyJoined = props.communities
        && (props.communities.find(c => c.name === props.name)) != null;

    return (
        <Wrapper>
            <Title>
                <Logo src={`http://localhost:8080/api/img/ca/${props.name}`} />
                <span>{props.name}</span>
            </Title>
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