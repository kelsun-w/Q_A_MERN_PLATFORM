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

    onClick = userid => {
        const { handleSubmit, id } = this.props;
        handleSubmit(id, userid);
    };

    toggleMenu = (event) => {
        event.preventDefault();
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
                <FlexCommand onClick={(e) => this.onClick(item.id)}>
                    <FontAwesomeIcon icon='trash' />
                </FlexCommand>
            </ModToolBodyItem>
        ))
    );

    render() {
        const { id, list } = this.props;
        return (
            <>
                <Header>Moderators</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem>
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
                        Hi
                    </Modal>
                }
            </>
        );
    };
};

export default ModeratorsPanel;
