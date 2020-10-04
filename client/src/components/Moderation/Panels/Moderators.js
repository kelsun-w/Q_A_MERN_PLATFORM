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
import { MOCK_DATA } from '../mock';


class ModeratorsPanel extends React.Component {

    mapList = list => (
        list.map(item => (
            <ModToolBodyItem>
                <FlexProfile>
                    <StyledAnchor href='/'>
                        <StyledImage src={`${process.env.REACT_APP_IMG_URL_UA}/${item.id}`} />
                        {item.username}
                    </StyledAnchor>
                </FlexProfile>
                {/* <FlexDate>
                    3 days ago
                </FlexDate> */}
                <FlexCommand>
                    <FontAwesomeIcon icon='trash' />
                </FlexCommand>
            </ModToolBodyItem>
        ))
    );

    render() {
        // const { id, list } = this.props;
        const list = MOCK_DATA.mods;
        console.log(list);
        return (
            <>
                <Header>Moderators</Header>
                <PanelWrapper>
                    <ModToolHead>
                        <ModToolHeadItem>
                            <Button><FontAwesomeIcon icon='sign-out-alt' />leave as mod</Button>
                        </ModToolHeadItem>
                        <ModToolHeadItem>
                            <Button><FontAwesomeIcon icon='user-plus' />add mod</Button>
                        </ModToolHeadItem>
                    </ModToolHead>
                    <ModToolBody>
                        {
                            list.length === 0 ?
                                <Empty />
                                :
                                this.mapList(list)
                        }
                    </ModToolBody>
                </PanelWrapper>
            </>
        );
    };
};

export default ModeratorsPanel;
