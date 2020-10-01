import React from 'react';
import styled from 'styled-components';
import { normalFont, smallFont } from '../shared/helpers';
import Button from '../shared/Button';
import ProfileForm from './ProfileForm/Container';
import ImageForm from './ImageForm/Container';
import Header from '../shared/Header';

const Wrapper = styled.div`
    background-color: ${props => props.theme.foreground};
    color: ${props => props.theme.normalText};
    padding: 8px;
`

const MenuOption = styled.div`
    display: flex;
    padding: 8px;
    justify-content: space-between;
`
const MenuDetail = styled.div`
    ${normalFont};

    & :not(:first-child){
        ${smallFont};
        color: ${props => props.theme.mutedText};
    }
`

class UserSetting extends React.Component {

    onSubmit = () => window.alert('submitted');

    render() {
        const { user } = this.props;
        return (
            <Wrapper>
                <Header>Profile Details</Header>
                <ProfileForm />
                <Header>Profile Avatar and banner image</Header>
                <ImageForm user={user} />
                <Header>Account Details</Header>
                <MenuOption style={{ display: 'flex' }}>
                    <MenuDetail>
                        <div>Email</div>
                        <div>{user.email}</div>
                    </MenuDetail>
                    <Button>Change</Button>
                </MenuOption>
                <MenuOption style={{ display: 'flex' }}>
                    <MenuDetail>
                        <div>Password</div>
                        <div>Create a new password</div>
                    </MenuDetail>
                    <Button>Change</Button>
                </MenuOption>
            </Wrapper>
        )
    }
};

export default UserSetting;