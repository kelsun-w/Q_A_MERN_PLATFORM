import React from 'react';
import CommunityDetail from '../../shared/CommunityDetail';

class MainDetail extends React.Component {
    join = event => {
        const { community, user, joinCommunity } = this.props;
        event.preventDefault();
        joinCommunity(community.name, user.id);
    }

    render() {
        const { community, communities, user } = this.props;
        if (!community) return null;
        return (
            <CommunityDetail
                name={community.name}
                description={community.description}
                created={community.created}
                members={community.members}
                onClick={this.join}
                communities={communities}
                user={user}
            />
        )
    };
}

export default MainDetail;