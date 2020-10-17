import React from 'react';
import styled from 'styled-components'
import { normalFont, smallFont, overflow } from '../../shared/helpers';
import ProfileForm from './ProfileForm/Container';
import ImageForm from './ImageForm/Container';
import PasswordForm from './PasswordForm/Container';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import { Modal } from '../../shared/Modal';

const MenuOption = styled.div`
    display: flex;
    padding: 8px;
    flex-flow: row wrap;
    justify-content: space-between;
`

const MenuDetail = styled.div`
    ${normalFont};
    ${overflow};
    & :not(:first-child){
        ${smallFont};
        color: ${props => props.theme.mutedText};
    }
`

class AccountSetting extends React.Component {

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
        const { display_name, display_about, email } = this.props;
        return (
            <>
                <Header>Profile Details</Header>
                <ProfileForm initialValues={{ display_name, display_about }} />
                <ImageForm />
                <Header >Account Details</Header>
                {/* <MenuOption>
                    <MenuDetail>
                        <div>Email</div>
                        <div>{email}</div>
                    </MenuDetail>
                    <Button>Change</Button>
                </MenuOption> */}
                <MenuOption>
                    <MenuDetail>
                        <div>Password</div>
                        <div>Create a new password</div>
                    </MenuDetail>
                    <Button onClick={this.toggleMenu}>Change</Button>
                </MenuOption>
                {this.state.isOpen &&
                    <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
                        <PasswordForm />
                    </Modal>
                }
            </>
        )
    };
}

export default AccountSetting;