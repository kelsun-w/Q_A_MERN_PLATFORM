import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
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
    FlexDate,
    StyledAnchor,
    StyledImage
} from './util';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import BanForm from './Forms/Banned/Container';
import Empty from '../../shared/FullPageMessage';
import { Modal } from '../../shared/Modal';

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin-right: 4px;
    }
`;

const BanCommandWrapper = styled.span`
    margin-left: auto;
`;

const EMPTY_MSG = 'No banned users here';

class BannedPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            selected: null
        }
    }

    toggleMenu = (edit, user) => {
        this.setState({
            isOpen: !this.state.isOpen,
            isEdit: edit,
            selected: user
        });
    };

    onUpdate = async updatedUser => {
        const { id, list, handleUpdate } = this.props;
        var update = list.map(item => {
            if (item.user.username === updatedUser.user) return { ...updatedUser, user: item.user.id } //Changing back to user_id. See Line 79/Flex command
            return item
        });
        console.log(update);
        const result = await handleUpdate(id, { banned: update });
        if (result) this.toggleMenu(false, null);
    };

    onAdd = async ban => {
        const { id, handleAdd } = this.props;
        const result = await handleAdd(id, ban);
        if (result) this.toggleMenu(false, null);
    }

    onRemove = userID => {
        this.props.handleRemove(this.props.id, userID);
    };

    mapList = list => (
        list.map(item => (
            <ModToolBodyItem>
                <StyledRow>
                    <FlexProfile>
                        <StyledAnchor href={`/u/${item.user.username}`}>
                            <StyledImage src={`${process.env.REACT_APP_IMG_URL_UA}/${item.user.id}`} />
                            {item.user.username}
                        </StyledAnchor>
                    </FlexProfile>
                    <FlexDate>
                    <span>...Added {moment(item.created).fromNow()}</span>
                    </FlexDate>
                </StyledRow>
                <BanCommandWrapper>
                    <FlexCommand onClick={(e) => this.toggleMenu(true, { ...item, user: item.user.username })} > {/*changing to username for form*/}
                        <FontAwesomeIcon icon='pen' />
                    </FlexCommand>
                    <FlexCommand onClick={(e) => this.onRemove(item.user.id)}>
                        <FontAwesomeIcon icon='trash' />
                    </FlexCommand>
                </BanCommandWrapper>
            </ModToolBodyItem>
        ))
    );

    render() {
        const { list, rules } = this.props;
        const { isOpen, isEdit, selected } = this.state;

        return (
            <>
                <Header>Banned Users</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem onClick={(e) => this.toggleMenu(false, null)} >
                            <Button>
                                <FontAwesomeIcon icon='user-slash' />
                            Ban a user
                            </Button>
                        </ModToolHeadItem>
                    </ModToolHead>
                    <ModToolBody>
                        {
                            list.length === 0 ?
                                <Empty>
                                    <FontAwesomeIcon icon='gavel' />
                                    {EMPTY_MSG}
                                </Empty>
                                :
                                this.mapList(list)
                        }
                    </ModToolBody>
                </PanelWrapper>
                {isOpen &&
                    <Modal isOpen={isOpen} onClose={(e) => this.toggleMenu(false, null)}>
                        <BanForm
                            callback={isEdit ? this.onUpdate : this.onAdd}
                            edit={isEdit}
                            initialValues={selected}
                            rules={rules}
                        />
                    </Modal>
                }
            </>
        );
    };
};

export default BannedPanel;
