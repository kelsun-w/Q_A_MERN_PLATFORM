import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { link } from '../../shared/helpers';

const Wrapper = styled.div`
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.foreground};
    color:  ${props => props.theme.normalText};
    border: 1px solid  ${props => props.theme.border};
    border-radius: 18px;
`

const BGCover = styled.div`
    background-color: royalblue;
    padding: 24px 0;
    border-radius: 18px 18px 0 0;
    width: 100%;
`

const DP = styled.img`
    border-radius: 20%;
    margin-top: -30px;
    margin-left: 10px;
    max-height: 60px;
    max-width: 60px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 8px;
`

const BoldText = styled.span`
    font-size: 16px;
    font-weight: 600;
`

const NormalText = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.theme.mutedText};
    margin-left: 5px;
`;

const StudentNo = styled.div`
    font-size: 14px;
    font-weight: 400;
`

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
    padding-right: 4px;
`
const ContentItem = styled.div`
    padding: 6px 0;
`

const Profile = (props) => {
    const ISOdate = new Date(props.user.joined);
    return (
        <Wrapper>
            <BGCover />
            <HeadFlex>
                <DP src={`http://localhost:8080/api/img/ua/${props.user.id}`} />
                <SettingLink to='/settings'><FontAwesomeIcon icon='user-edit' /></SettingLink>
            </HeadFlex>
            <Content>
                <ContentItem>
                    <BoldText>DisplayName
                        <NormalText>
                            @{props.user.username}
                        </NormalText>
                    </BoldText>
                </ContentItem>
                <ContentItem>
                    <BoldText>About me</BoldText>
                    <RowFlex>
                        <NormalText>I am very bad good boy. I am very bad good boy.I am very bad good boy.I am very bad good boy.I am very bad good boy.</NormalText>
                    </RowFlex>
                </ContentItem>
                <ContentItem>
                    <DetailInfo>
                        <ColumnFlex>
                            <BoldText>Points</BoldText>
                            <RowFlex>
                                <FontAwesomeIcon icon='medal' />
                                <NormalText>99</NormalText>
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
                            {props.user.email}
                        </NormalText>
                    </Email>
                </ContentItem>
            </Content>
        </Wrapper>
    );
};

export default Profile;