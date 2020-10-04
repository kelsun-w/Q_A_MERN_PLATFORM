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

class AboutPanel extends React.Component {
    render() {
        return (
            <div>
                <Header>About Community</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem>
                            <Button><FontAwesomeIcon icon='sign-out-alt' />leave as mod</Button>
                        </ModToolHeadItem>
                        <ModToolHeadItem>
                            <Button><FontAwesomeIcon icon='plus' />add mod</Button>
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

export default AboutPanel;
