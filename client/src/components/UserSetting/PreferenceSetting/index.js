import React from 'react';
import styled from 'styled-components'
import { normalFont, smallFont } from '../../shared/helpers';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import ThemeSetting from './Theme';
import LanguageSetting from './Language';
import DeleteForm from './DeleteForm/Container';
import { Modal } from '../../shared/Modal';

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

class PreferenceSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    };

    toggleMenu = (event) => {
        event.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {
        return (
            <>
                {/* <Header >Language</Header>
                <MenuOption >
                    <LanguageSetting {...this.props} />
                </MenuOption> */}
                <Header >Theme</Header>
                <MenuOption>
                    <ThemeSetting {...this.props} />
                </MenuOption>
                <Header >Privacy</Header>
                <MenuOption style={{ display: 'flex' }}>
                    <MenuDetail>
                        <div>Account Deactivation (DANGER!)</div>
                        <div>Deactivate your account</div>
                    </MenuDetail>
                    <Button onClick={this.toggleMenu}>Deactivate</Button>
                </MenuOption>
                {this.state.isOpen &&
                    <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
                        <DeleteForm />
                    </Modal>
                }
            </>
        )
    };
}

export default PreferenceSetting;