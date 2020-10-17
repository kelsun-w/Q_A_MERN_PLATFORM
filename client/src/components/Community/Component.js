import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryMenuContainer from '../CategoryMenu/Container';
import PostListContainer from '../PostList/Container';
import PostDetailContainer from '../PostDetail/Container';
import FullPageEmpty from '../shared/FullPageMessage';
import LoadingIndicatorBox from '../shared/LoadingIndicator/Box';

const ERR_MSG = 'Could not load community posts.';
const BAN_MSG = 'Sorry. You are banned from this community.';

class CommunityPostList extends React.Component {

    render() {
        if (this.props.isFetching) return <LoadingIndicatorBox />

        const bannedList = this.props.community && this.props.community.banned;
        if (!bannedList)
            return (
                <FullPageEmpty>
                    <FontAwesomeIcon icon='exclamation-triangle' />
                    <span>{ERR_MSG}</span>
                </FullPageEmpty>
            );
        if (this.props.user) {
            for (var i = 0; i < bannedList.length; i++) {
                if (bannedList[i].user.id === this.props.user.id) {
                    return (
                        <FullPageEmpty>
                            <FontAwesomeIcon icon='hand-paper' />
                            <div>{BAN_MSG}</div>
                            <div>OFFENCE: {bannedList[i].offence}</div>
                        </FullPageEmpty>
                    );
                }
            };
        };
        return (
            <Switch>
                <Route exact path={`${this.props.match.url}/:community`}
                    render={({ match }) => (
                        <>
                            <CategoryMenuContainer />
                            <PostListContainer category={match.params.community} />
                        </>
                    )}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/:community/:post`}
                    render={({ match, history }) => (
                        <PostDetailContainer id={match.params.post} history={history} />
                    )}
                />
            </Switch>
        );
    };
};

export default CommunityPostList;
