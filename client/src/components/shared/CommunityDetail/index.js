import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Divider from '../Divider';
import Title from './Header';
import MemberNumber from './Member';
import CreatedDate from './Date';
import JoinButton from './Button';
import { link } from '../../shared/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
    position: relative;
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
    height: 50px;
    width: 50px;
    object-fit: cover;
    background-color: #fff;
`

const ModLink = styled(Link)`
    ${link};
    position: absolute;
    font-size: 24px;
    color: ${props => props.theme.icon};
    right: 0;
    margin-left: auto;
`;

const HeaderLink = styled(Link)`
    ${link};
    display: flex;
    align-items: center;
`;

const MainDetail = (props) => {
    const alreadyJoined = props.communities
        && (props.communities.find(c => c.name === props.name)) != null;

    const isMod = props.user && props.user.admin ||
        (props.mods
            && props.user
            && (props.mods.find(item => item.id === props.user.id) != null));

    const IMG_URL = props.hasPicture ? `${process.env.REACT_APP_IMG_URL_CA}/${props.name}` : `${process.env.PUBLIC_URL}/images/communityprofile.png`;

    return (
        <Wrapper>
            <Title>
                <HeaderLink to={`/c/${props.name}`}>
                    <Logo src={IMG_URL} />
                    <span>{props.name}</span>
                </HeaderLink>
                {isMod && <ModLink to={`/mod/${props.name}/about`}><FontAwesomeIcon icon='shield-alt' /></ModLink>}
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