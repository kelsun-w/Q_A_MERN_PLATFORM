import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AboutPanel from './Panels/About';
import ReportPanel from './Panels/Report';
import BannedPanel from './Panels/Banned';
import ModeratorPanel from './Panels/Moderators';
import RulesPanel from './Panels/Rules';
import LoadingIndicator from '../shared/LoadingIndicator/Spinner';

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
        const { community, path } = this.props;

        return (
            <Wrapper>
                {this.props.isFetching && <LoadingIndicator />}
                <Switch>
                    <Route
                        path={`${path}/about`}
                        render={() => (
                            <AboutPanel id={community.id} />
                        )}
                    />
                    <Route
                        path={`${path}/reports`}
                        render={() => (
                            <ReportPanel id={community.id} />
                        )}
                    />
                    <Route
                        path={`${path}/banned`}
                        render={() => (
                            <BannedPanel id={community.id} list={community.banned} />
                        )}
                    />
                    <Route
                        path={`${path}/moderators`}
                        render={() => (
                            <ModeratorPanel id={community.id} list={community.mods} />
                        )}
                    />
                    <Route
                        path={`${path}/rules`}
                        render={() => (
                            <RulesPanel id={community.id} list={community.rules} />
                        )}
                    />
                </Switch>
            </Wrapper>
        )
    }
};

export default Moderation;