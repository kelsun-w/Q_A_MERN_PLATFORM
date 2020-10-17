import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ModToolHead,
    ModToolHeadItem,
    ModToolBody,
    ModToolBodyItem
} from '../ModToolsUtil';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import { Modal } from '../../shared/Modal';
import { smallFont, normalFont, overflow } from '../../shared/helpers';
import AboutForm from './Forms/About/AboutForm/Container';
import ImageForm from './Forms/About/ImageForm/Container';


const Wrapper = styled.div`
    background-color: ${props => props.theme.foreground};
    border: inherit;
    border-radius: 4px;
    padding: 0px 8px;
`

const MenuOption = styled.div`
    display: flex;
    padding: 16px 0px 16px 16px;
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

const HEADER1 = 'Community Details';
const HEADER2 = 'Danger Zone';

class AboutPanel extends React.Component {

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
        const { id, description, picture } = this.props;
        return (
            <Wrapper>
                <Header>{HEADER1}</Header>
                <AboutForm id={id} initialValues={{ description }} />
                <ImageForm id={id} picture={picture} />
                {/* <Header danger>{HEADER2}</Header>
                <MenuOption>
                    <MenuDetail>
                        <div>Delete Community</div>
                        <div>Request Deletion of community</div>
                    </MenuDetail>
                    <Button onClick={this.toggleMenu} danger>Request Delete</Button>
                </MenuOption> */}
                {this.state.isOpen &&
                    <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
                        <AboutForm />
                    </Modal>
                }
            </Wrapper>
        );
    };
};

export default AboutPanel;
