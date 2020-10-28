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
    FlexCommand,
    FlexDate
} from './util';
import Header from '../../shared/Header';
import Empty from '../../shared/FullPageMessage';
import { Modal } from '../../shared/Modal';
import { normalFont } from '../../shared/helpers';
import ReportForm from './Forms/Report/Container';
import Dropdown from '../../shared/SelectDropdown';

const StyledHeadWrapper = styled(ModToolHead)`
    justify-content: flex-start;
    & > *:not(:last-child) {
        margin-right: 6px;
    }
`;

const ReportIndex = styled.span`
    ${normalFont};
    flex: 0 0 32px;
`;

const ReportTitle = styled.span`
    ${normalFont};
    margin: 6px;
`;

const ReportCommandWrapper = styled.span`
    margin-left: auto;
`;

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin-right: 4px;
    }
`;

const EMPTY_MSG = "No reports here!";

class ReportsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '0',
            isOpen: false,
            selected: null,
            filterList: []
        };
        this.onFilterChange = this.onFilterChange.bind(this);
    };

    componentDidMount() {
        const { id, handleFetch } = this.props;
        handleFetch(id)
            .then(() => this.setState({ filterList: this.getFilteredList(this.state.filter) }));
    };

    getFilteredList = (value) => {
        const { list } = this.props;

        var filteredlist = list.filter(item => item.status == value);
        return filteredlist;
    };

    toggleMenu = (report) => {
        this.setState({
            isOpen: !this.state.isOpen,
            selected: report
        });
    };

    onUpdate = async values => {
        const { handleUpdate } = this.props;
        const { filter } = this.state;
        const result = await handleUpdate(this.state.selected.id, values);
        if (result) {
            this.setState({ filterList: this.getFilteredList(filter) },
                () => this.toggleMenu(null));
        }
    };

    onDelete = async (e) => {
        const { handleRemove } = this.props;
        const { selected: { id }, filter } = this.state;
        const result = await handleRemove(id);
        if (result) {
            this.setState({ filterList: this.getFilteredList(filter) },
                () => this.toggleMenu(null));
        }
    };

    onFilterChange = e => {
        this.setState({
            filter: e.target.value,
            filterList: this.getFilteredList(e.target.value)
        });
    };

    mapList = list => (
        list.map((item, index) => (
            <ModToolBodyItem>
                <StyledRow>
                    <ReportIndex light>{++index}.</ReportIndex>
                    <ReportTitle light>Post ID #{item.post.postid}</ReportTitle>
                    <FlexDate>
                        Submitted {moment(item.created).fromNow()}
                    </FlexDate>
                </StyledRow>
                <ReportCommandWrapper>
                    <FlexCommand onClick={(e) => this.toggleMenu({ ...item })} >
                        <FontAwesomeIcon icon='eye' />
                    </FlexCommand>
                </ReportCommandWrapper>
            </ModToolBodyItem>
        ))
    );

    getSelectedValues() {
        const { selected } = this.state;
        return {
            username: selected.offender.username,
            offence: selected.offence,
            title: selected.post.title,
            preview: selected.post.preview,
            status: selected.status,
            postid: selected.post.postid,
            community: selected.community.name
        }
    };

    render() {
        const { id } = this.props;
        const { isOpen, filterList } = this.state;
        return (
            <>
                <Header>Report Queue</Header>
                <PanelWrapper>
                    <StyledHeadWrapper>
                        <span>Filter by</span>
                        <ModToolHeadItem>
                            <Dropdown value={this.state.filter} handleChange={this.onFilterChange}>
                                <option value='0'>Pending</option>
                                <option value='1'>Approved</option>
                                <option value='-1'>Rejected</option>
                            </Dropdown>
                        </ModToolHeadItem>
                    </StyledHeadWrapper>
                    <ModToolBody>
                        {
                            filterList.length === 0 ?
                                <Empty>
                                    <FontAwesomeIcon icon='flag' />
                                    {EMPTY_MSG}
                                </Empty>
                                :
                                this.mapList(filterList)
                        }
                    </ModToolBody>
                </PanelWrapper>
                {
                    isOpen &&
                    <Modal isOpen={isOpen} onClose={(e) => this.toggleMenu(null)}>
                        <ReportForm
                            id={id}
                            handleUpdate={this.onUpdate}
                            handleRemove={this.onDelete}
                            initialValues={this.getSelectedValues()}
                        />
                    </Modal>
                }
            </>
        );
    };
};

export default ReportsPanel;
