import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AboutPanel from './Panels/About';
import ReportPanel from './Panels/Report';
import BannedPanel from './Panels/Banned';
import ModeratorPanel from './Panels/Moderators';
import RulesPanel from './Panels/Rules';
import LoadingIndicator from '../shared/LoadingIndicator/Spinner';
import { addRule, removeRule } from '../../actions/community';
import { updateCommunity } from '../../util/api';

const Wrapper = styled.div`
    color: ${props => props.theme.normalText};
    padding: 8px;
`

class Moderation extends React.Component {

    componentDidMount() {
        const { id, community, fetchCommunity, token, history } = this.props;
        if (!token)
            history.push('/');
        if (!community || community.name !== id)
            fetchCommunity(id);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.token || prevProps.token !== this.props.token)
            this.props.history.push('/')
    };

    render() {
        if (!this.props.token || !this.props.community) return null;
        const { community: { name, banned, mods, rules }, user, path } = this.props;
        const {
            assignMod,
            updateCommunity,
            addRule,
            removeRule
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
                            />
                        )}
                    />
                    <Route
                        path={`${path}/reports`}
                        render={() => (
                            <ReportPanel
                                id={name}
                            />
                        )}
                    />
                    <Route
                        path={`${path}/banned`}
                        render={() => (
                            <BannedPanel
                                id={name}
                                list={banned}
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