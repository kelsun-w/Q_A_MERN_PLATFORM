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
        if (!this.props.community) return null;
        return (
            <>
                <MainDetail {...this.props} />
                <RuleDetail rules={this.props.community.rules} />
            </>
        );
    }
}

export default CommunityDetail;