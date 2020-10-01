import React from 'react';
import styled from 'styled-components'
import { normalFont, smallFont } from '../../shared/helpers';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import ThemeSetting from './Theme';
import LanguageSetting from './Language';

const MenuOption = styled.div`
    display: flex;
    padding: 8px;
    justify-content: space-between;
    margin: 10px;
`

const MenuDetail = styled.div`
    ${normalFont};

    & :not(:first-child){
        ${smallFont};
        color: ${props => props.theme.mutedText};
    }
`

const PreferenceSetting = props => (
    <>
        <Header >Language</Header>
        <MenuOption >
            <LanguageSetting {...props} />
        </MenuOption>
        <Header >Theme</Header>
        <MenuOption>
            <ThemeSetting {...props} />
        </MenuOption>
        <Header >Privacy</Header>
        <MenuOption style={{ display: 'flex' }}>
            <MenuDetail>
                <div>Account Deactivation (DANGER!)</div>
                <div>Deactivate your account</div>
            </MenuDetail>
            <Button>Change</Button>
        </MenuOption>
    </>
);

export default PreferenceSetting;