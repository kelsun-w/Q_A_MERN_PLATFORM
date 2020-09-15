import React from 'react';
import MainDetail from './MainDetail';
import RuleDetail from './RuleDetail';

class CommunityDetail extends React.Component {
    componentDidMount() {
        const { category, fetchCommunity, fetchCommunities, user } = this.props;
        fetchCommunity(category);

        if (user)
            fetchCommunities(user.id);
        else
            fetchCommunities('');
    }

    render() {
        return (
            <MainDetail {...this.props} />
        );
    }
}

export default CommunityDetail;