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

const PanelWrapper = styled.div`
    padding: 8px;
`;

class ReportsPanel extends React.Component {
    render() {
        return (
            <div>
                <Header>Report Queue</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem>
                            <Button><FontAwesomeIcon icon='trash' />Delete</Button>
                        </ModToolHeadItem>
                    </ModToolHead>
                    <ModToolBody>
                        <ModToolBodyItem><div>Hi</div></ModToolBodyItem>
                        <ModToolBodyItem><div>Hi</div></ModToolBodyItem>
                        <ModToolBodyItem><div>Hi</div></ModToolBodyItem>
                        <ModToolBodyItem><div>Hi</div></ModToolBodyItem>
                        <ModToolBodyItem><div>Hi</div></ModToolBodyItem>
                    </ModToolBody>
                </PanelWrapper>
            </div>
        );
    };
};

export default ReportsPanel;
