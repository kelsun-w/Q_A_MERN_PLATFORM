import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AboutPanel from './Panels/About';
import ReportPanel from './Panels/Report';
import BannedPanel from './Panels/Banned';
import ModeratorPanel from './Panels/Moderators';
import RulesPanel from './Panels/Rules';
import LoadingIndicator from '../shared/LoadingIndicator/Spinner';
import FullPageMessage from '../shared/FullPageMessage';

const Wrapper = styled.div`
    color: ${props => props.theme.normalText};
    padding: 8px;
`;

class Moderation extends React.Component {

    componentDidMount() {
        const { id, community, fetchCommunity, token, history } = this.props;
        if (!token)
            history.push('/');
        if (!community || community.name !== id)
            fetchCommunity(id);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.token)
            this.props.history.push('/')
    };

    render() {
        if (!this.props.token || !this.props.community) return null;
        const { community: { name, banned, mods, rules, picture, description }, user, path, reports } = this.props;

        const isMod = user && user.admin ||
            (mods
                && user
                && (mods.find(item => item.id === user.id) != null));

        if (!isMod)
            return (
                <FullPageMessage>
                    <FontAwesomeIcon icon='exclamation-triangle' />
                    <span>Sorry. Only moderators of {name} can access this section.</span>
                </FullPageMessage>
            );

        const {
            assignMod,
            updateCommunity,
            imageUpload,
            addRule,
            removeRule,
            addBan,
            removeBan,
            fetchReports,
            createReport,
            updateReport,
            deleteReport
        } = this.props;
        return (
            <Wrapper>
                {this.props.isFetching && <LoadingIndicator />}
                <Switch>
                    <Route
                        path={`${path}/about`}
                        render={() => (
                            <AboutPanel
                                id={name}
                                picture={picture}
                                handleUpdate={updateCommunity}
                                handleUpload={imageUpload}
                                description={description}
                            />
                        )}
                    />
                    <Route
                        path={`${path}/reports`}
                        render={() => (
                            <ReportPanel
                                id={name}
                                list={reports}
                                handleFetch={fetchReports}
                                handleUpdate={updateReport}
                                handleAdd={createReport}
                                handleRemove={deleteReport}
                            />
                        )}
                    />
                    <Route
                        path={`${path}/banned`}
                        render={() => (
                            <BannedPanel
                                id={name}
                                list={banned}
                                rules={rules}
                                handleAdd={addBan}
                                handleRemove={removeBan}
                                handleUpdate={updateCommunity}
                            />
                        )}
                    />
                    <Route
                        path={`${path}/moderators`}
                        render={() => (
                            <ModeratorPanel
                                user={user}
                                id={name}
                                list={mods}
                                handleSubmit={assignMod}
                            />
                        )}
                    />
                    <Route
                        path={`${path}/rules`}
                        render={() => (
                            <RulesPanel
                                id={name}
                                list={rules}
                                handleAdd={addRule}
                                handleRemove={removeRule}
                                handleUpdate={updateCommunity}
                            />
                        )}
                    />
                </Switch>
            </Wrapper>
        )
    }
};

export default Moderation;