import React from 'react';
import styled from 'styled-components';
import { normalFont, smallFont, link } from '../shared/helpers';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
    ${link};
    display: flex;
    align-items: center;
    width: 100%;
    padding: 4px 16px 4px 8px;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;

    & > :first-child{
        margin-right: 5px; 
    };

    :hover,
    :focus{
        background-color: ${props => props.theme.hover};
    };
`;

const DisplayName = styled.div`
    ${normalFont};
    color: ${props => props.theme.normalText};
`;

const DisplayScore = styled.div`
    ${smallFont};
    color: ${props => props.theme.mutedText};
`;

const DisplayImage = styled.img`
    border-radius: 100%;
    max-height: 50px;
    max-width: 50px;
    border: 1.5px solid #ccc;
`;

const UserItem = (props) => {
    const IMG_URL = props.user && props.user.picture ?
        `${process.env.REACT_APP_IMG_URL_UA}/${props.user.id}` :
        `${process.env.PUBLIC_URL}/images/userprofile.png`;

    return (
        <Wrapper to={`/u/${props.user.username}`}>
            <DisplayImage
                src={IMG_URL}
                alt='profile image'
            />
            <div>
                <DisplayName>{props.user.username}</DisplayName>
                <DisplayScore>{`${props.user.score} kudos`}</DisplayScore>
            </div>
        </Wrapper>
    );
};

export default UserItem;
