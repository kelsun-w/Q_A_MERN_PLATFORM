import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { link, smallFont, normalFont } from '../../shared/helpers';
import FullPageMessage from '../../shared/FullPageMessage';

const Wrapper = styled.div`
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.foreground};
    color:  ${props => props.theme.normalText};
    border: 1px solid  ${props => props.theme.border};
    border-radius: 18px;
`

const BGCover = styled.div`
    background-color: ${props => props.theme.primary};
    padding: 32px 0;
    border-radius: 18px 18px 0 0;
    width: 100%;
`

const DP = styled.img`
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;
    margin-top: -55px;
    margin-left: 10px;
    height: 88px;
    width: 88px;
    object-fit: cover;
    background-color: #fff;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 8px;
`

const BoldText = styled.span`
    ${normalFont}
`

const NormalText = styled.span`
    ${smallFont};
    color: ${props => props.theme.mutedText};
    margin-left: 5px;
`;

const Email = styled.div`
    border-top: 1px solid ${props => props.theme.border};
`

const DetailInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 18px;
`

const HeadFlex = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
`

const RowFlex = styled.div`
    display: flex;
`

const ColumnFlex = styled.div`
    display: flex;
    flex-direction: column;
`

const SettingLink = styled(Link)`
    ${link}
    font-size: 18px;
    color: ${props => props.theme.icon};
    padding-right: 4px;
`
const ContentItem = styled.div`
    padding: 6px 0;
`

class Profile extends React.Component {

    componentDidMount() {
        const { username, getUser } = this.props;
        getUser(username);
    };

    render() {
        if (this.props.isFetching)
            return null

        if (!this.props.fetchedUser)
            return <FullPageMessage>
                <FontAwesomeIcon icon='exclamation-triangle' />
                <span>Could not load user</span>
            </FullPageMessage>;

        const { user, fetchedUser: { id, username, picture, display_name, display_about, joined, score, email } } = this.props;

        const IMG_URL = picture ? `${process.env.REACT_APP_IMG_URL_UA}/${id}` : `${process.env.PUBLIC_URL}/images/userprofile.png`;

        const ISOdate = new Date(joined);
        return (
            <Wrapper>
                <BGCover />
                <HeadFlex>
                    <DP src={IMG_URL} />
                    {
                        (user && user.id === id)
                        && <SettingLink to='/settings'><FontAwesomeIcon icon='user-edit' /></SettingLink>
                    }
                </HeadFlex>
                <Content>
                    <ContentItem>
                        <BoldText>{display_name}
                            <NormalText>
                                @{username}
                            </NormalText>
                        </BoldText>
                    </ContentItem>
                    {
                        display_about &&
                        <ContentItem>
                            <BoldText small>About me</BoldText>
                            <RowFlex>
                                <NormalText>{display_about}</NormalText>
                            </RowFlex>
                        </ContentItem>
                    }
                    <ContentItem>
                        <DetailInfo>
                            <ColumnFlex>
                                <BoldText>Points</BoldText>
                                <RowFlex>
                                    <FontAwesomeIcon icon='medal' />
                                    <NormalText>{score}</NormalText>
                                </RowFlex>
                            </ColumnFlex>
                            <ColumnFlex>
                                <BoldText>Joined on</BoldText>
                                <RowFlex>
                                    <FontAwesomeIcon icon='birthday-cake' />
                                    <NormalText>
                                        {ISOdate.getDate() + '-' + (ISOdate.getMonth() + 1) + '-' + ISOdate.getFullYear()}
                                    </NormalText>
                                </RowFlex>
                            </ColumnFlex>
                        </DetailInfo>
                    </ContentItem>
                    <ContentItem>
                        <Email>
                            <NormalText>
                                {email}
                            </NormalText>
                        </Email>
                    </ContentItem>
                </Content>
            </Wrapper>
        );
    };
};

export default Profile;