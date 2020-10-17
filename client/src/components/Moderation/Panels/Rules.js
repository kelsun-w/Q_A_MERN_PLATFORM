import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ModToolHead,
    ModToolHeadItem,
    ModToolBody,
    ModToolBodyItem
} from '../ModToolsUtil';
import {
    PanelWrapper,
    FlexCommand
} from './util';
import Button from '../../shared/Button';
import Header from '../../shared/Header';
import RuleForm from './Forms/Rule/Container';
import Empty from '../../shared/FullPageMessage';
import { Modal } from '../../shared/Modal';
import { normalFont } from '../../shared/helpers';

const EMPTY_MSG = "No rules here. Oh dear!";

const RuleIndex = styled.span`
    ${normalFont};
    flex: 0 0 32px;
`;

const RuleTitle = styled.span`
    ${normalFont};
    margin: 6px;
`;

const RuleCommandWrapper = styled.span`
    margin-left: auto;
`;

class RulesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            selected: null,
        };
    };

    toggleMenu = (edit, rule) => {
        this.setState({
            isOpen: !this.state.isOpen,
            isEdit: edit,
            selected: rule
        });
    };

    onUpdate = async rule => {
        const { id, list, handleUpdate } = this.props;
        var update = list.map(item => {
            if (item.id === rule.id) return rule
            return item
        });
        const result = await handleUpdate(id, { rules: update });
        if (result) this.toggleMenu(false, null);
    };

    onAdd = async rule => {
        const { id, handleAdd } = this.props;
        const result = await handleAdd(id, rule);
        if (result) this.toggleMenu(false, null);
    }

    onRemove = ruleID => {
        this.props.handleRemove(this.props.id, ruleID);
    };

    mapList = list => (
        list.map((item, index) => (
            <ModToolBodyItem>
                <RuleIndex light>{++index}.</RuleIndex>
                <RuleTitle light>{item.title}</RuleTitle>
                {/* <FlexDate>
                    3 days ago
                </FlexDate> */}
                <RuleCommandWrapper>
                    <FlexCommand onClick={(e) => this.toggleMenu(true, { ...item })} >
                        <FontAwesomeIcon icon='pen' />
                    </FlexCommand>
                    <FlexCommand onClick={(e) => this.onRemove(item.id)}>
                        <FontAwesomeIcon icon='trash' />
                    </FlexCommand>
                </RuleCommandWrapper>
            </ModToolBodyItem>
        ))
    );

    render() {
        const { isOpen, isEdit, selected } = this.state;
        const { id, list, user } = this.props;
        return (
            <>
                <Header>Rules</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem onClick={(e) => this.toggleMenu(false, null)}>
                            <Button><FontAwesomeIcon icon='plus' />Add Rule</Button>
                        </ModToolHeadItem>
                    </ModToolHead>
                    <ModToolBody>
                        {
                            list.length === 0 ?
                                <Empty>
                                    <FontAwesomeIcon icon='clipboard-list' />
                                    {EMPTY_MSG}
                                </Empty>
                                :
                                this.mapList(list)
                        }
                    </ModToolBody>
                </PanelWrapper>
                {isOpen &&
                    <Modal isOpen={isOpen} onClose={(e) => this.toggleMenu(false, null)}>
                        <RuleForm
                            callback={isEdit ? this.onUpdate : this.onAdd}
                            edit={isEdit}
                            initialValues={selected}
                        />
                    </Modal>
                }
            </>
        );
    };
};

export default RulesPanel;
