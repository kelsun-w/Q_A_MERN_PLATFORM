import React from 'react';
import CommunityDetail from '../../shared/CommunityDetail';

class MainDetail extends React.Component {
    join = event => {
        event.preventDefault();
        const { community, user, joinCommunity } = this.props;
        joinCommunity(community.name, user.id);
    }

    render() {
        const { community, communities, user } = this.props;
        if (!community) return null;
        return (
            <CommunityDetail
                hasPicture={community.picture}
                name={community.name}
                description={community.description}
                created={community.created}
                members={community.members}
                mods={community.mods}
                onClick={this.join}
                communities={communities}
                user={user}
            />
        )
    };
}

export default MainDetail;