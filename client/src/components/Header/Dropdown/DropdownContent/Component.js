import styled from 'styled-components';
import React from 'react';
import MenuOption from './MenuOption';
import Divider from "../../../shared/Divider";
import { MutedText } from '../Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        {user &&
            <>
                <Header>Personal</Header>
                <MenuOption destination='/createpost/link' overflow>
                    <FontAwesomeIcon icon='pencil-alt' />
                    <span>Create Post</span>
                </MenuOption>
                <MenuOption destination={`/u/${user.username}`} >
                    <FontAwesomeIcon icon='address-book' />
                    <span>My Profile</span>
                </MenuOption>
                <MenuOption destination='/settings' >
                    <FontAwesomeIcon icon='cog' />
                    <span>Account Settings</span>
                </MenuOption>
            </>
        }
        <Header>View Setting</Header>
        <MenuOption destination='#' onClick={toggleDarkTheme} >
            <FontAwesomeIcon icon='moon' />
            <span>Darkmode</span>
        </MenuOption>
        {/* <MenuOption destination='#' onClick={toggleDarkTheme} >
            <FontAwesomeIcon icon='globe' />
            <span>Language</span>
        </MenuOption> */}
        <Divider />
        <MenuOption destination={user ? '#' : '/login'} onClick={logout}>
            <FontAwesomeIcon icon={user ? 'sign-out-alt' : 'sign-in-alt'} />
            <span>{user ? 'Log out' : 'Login/Sign up'}</span>
        </MenuOption>
    </Wrapper>
);

export default DropdownContent;