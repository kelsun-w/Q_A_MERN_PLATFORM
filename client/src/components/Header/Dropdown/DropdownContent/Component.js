import styled from 'styled-components';
import React from 'react';
import MenuOption from './MenuOption';
import Divider from "../../../shared/Divider";
import { MutedText } from '../Text';
import ProfileIcon from "../../../shared/icons/profile";
import SettingIcon from "../../../shared/icons/setting";
import DarkModeIcon from "../../../shared/icons/darkmode";
import LanguageIcon from "../../../shared/icons/language";
import LoginIcon from "../../../shared/icons/login";
import CreatePostIcon from "../../../shared/icons/create_post";
import MessageIcon from "../../../shared/icons/message";
import NotificationIcon from "../../../shared/icons/notification";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    position: absolute; 
    width: 100%;
    min-width: 200px;
    right: 0;
    top: 40px;
    
    margin-top: -3px;
    border: 1.5px solid ${props => props.theme.border};
    border-top: 0;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
    background: ${props => props.theme.foreground};
    padding: 1.5px;

    @media (max-width: 425px) {
        top: 35.5px;
    }
`

const Header = styled(MutedText)`
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .5px;
    line-height: 12px;
    margin: 8px 0 4px 12px;
`;

const DropdownContent = ({ user, logout, toggleDarkTheme }) => (
    <Wrapper>
        <Header>Personal</Header>
        <MenuOption destination='/createpost' overflow>
            <CreatePostIcon />
            <span>Create Post</span>
        </MenuOption>
        <MenuOption destination={`/u/${user.username}`} >
            <ProfileIcon />
            <span>My Profile</span>
        </MenuOption>
        <MenuOption destination='/message/inbox' overflow>
            <MessageIcon />
            <span>Messages</span>
        </MenuOption>
        <MenuOption destination='#' overflow>
            <NotificationIcon />
            <span>Notifications</span>
        </MenuOption>
        <MenuOption destination='/settings' >
            <SettingIcon />
            <span>Account Settings</span>
        </MenuOption>

        <Header>View Setting</Header>
        <MenuOption destination='#' onClick={toggleDarkTheme} >
            <DarkModeIcon />
            <span>Darkmode</span>
        </MenuOption>
        <MenuOption destination='#' onClick={toggleDarkTheme} >
            <LanguageIcon />
            <span>Language</span>
        </MenuOption>
        <Divider />
        <MenuOption destination='#' onClick={logout}>
            <LoginIcon />
            <span>Log out</span>
        </MenuOption>
    </Wrapper>
);

export default DropdownContent;