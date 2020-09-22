import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    background-color: ${props => props.theme.foreground};
    color:  ${props => props.theme.normalText};
    border: 1px solid  ${props => props.theme.border};
    border-radius: 3px;
`

const BGCover = styled.div`
    background-color: royalblue;
    padding: 24px 0;
    border-radius: 3px 3px 0 0;
    width: 100%;
`
const DP = styled.img`
    border-radius: 30px;
    margin-top: -30px;
    margin-left: 10px;
    max-height: 60px;
    max-width: 60px;
`

const Name = styled.span`
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
`

const StudentNo = styled.div`
    font-size: 14px;
    font-weight: 400;
    padding: 10px 16px;
`

const Email = styled.div`
    font-size: 14px;
    font-weight: 400;
    padding: 0 16px 10px;
`

const InnerWrapper = styled.div`
    display: flex;

`

const Profile = (props) => (
    <Wrapper>
        <BGCover />
        <InnerWrapper>
            <DP src={process.env.PUBLIC_URL + '/images/default_dp.jpg'} />
            <Name>{props.user.username}</Name>
        </InnerWrapper>
        <StudentNo>Student No: &nbsp;{props.user.studentNo}</StudentNo>
        <Email>Email: {props.user.email}</Email>
    </Wrapper>
);

export default Profile;