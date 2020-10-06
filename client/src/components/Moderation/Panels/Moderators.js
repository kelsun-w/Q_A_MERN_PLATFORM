import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ModToolHead,
    ModToolHeadItem,
    ModToolBody,
    ModToolBodyItem
} from '../ModToolsUtil';
import {
    PanelWrapper,
    FlexProfile,
    FlexCommand,
    StyledAnchor,
    StyledImage
} from './util';
import ModForm from './Forms/Mod/Container';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import Empty from '../../shared/Empty';
import { Modal } from '../../shared/Modal';

const EMPTY_MSG = "No moderators. Oh dear!";

class ModeratorsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    addMod = async (username) => {
        const { id, list, handleSubmit } = this.props;

        ////If user is already in mod list. show error instead.
        // const existing = false
        // for (const key in list) {
        //     if (list[key].username === username) {
        //         existing = true;
        //         break;
        //     }
        // }
        // if (existing) 
        //  //Show error notification

        const result = await handleSubmit(id, username);
        if (result) this.toggleMenu();
    };

    // leaveAsMod = async (username) {
    //     //Leave mod role
    //     //Redirect to home and don't allow user access to modtools
    // }

    toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    mapList = list => (
        list.map(item => (
            <ModToolBodyItem>
                <FlexProfile>
                    <StyledAnchor href={`/u/${item.username}`}>
                        <StyledImage src={`${process.env.REACT_APP_IMG_URL_UA}/${item.id}`} />
                        {item.username}
                    </StyledAnchor>
                </FlexProfile>
                {/* <FlexDate>
                    3 days ago
                </FlexDate> */}
                <FlexCommand onClick={(e) => this.props.handleSubmit(this.props.id, item.username)}>
                    <FontAwesomeIcon icon='trash' />
                </FlexCommand>
            </ModToolBodyItem>
        ))
    );

    render() {
        const { id, list, handleSubmit, user } = this.props;
        return (
            <>
                <Header>Moderators</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem onClick={(e) => handleSubmit(id, user.username)}>
                            <Button><FontAwesomeIcon icon='sign-out-alt' />leave as mod</Button>
                        </ModToolHeadItem>
                        <ModToolHeadItem onClick={this.toggleMenu}>
                            <Button ><FontAwesomeIcon icon='user-plus' />add mod</Button>
                        </ModToolHeadItem>
                    </ModToolHead>
                    <ModToolBody>
                        {
                            list.length === 0 ?
                                <Empty message={EMPTY_MSG} />
                                :
                                this.mapList(list)
                        }
                    </ModToolBody>
                </PanelWrapper>
                {this.state.isOpen &&
                    <Modal isOpen={this.state.isOpen} onClose={this.toggleMenu}>
                        <ModForm callback={this.addMod} />
                    </Modal>
                }
            </>
        );
    };
};

export default ModeratorsPanel;
