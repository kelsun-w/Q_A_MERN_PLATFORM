import { connect } from 'react-redux';
import { compose } from 'redux'
import withAuth from '../../../util/withAuth';
import { fetchCommunities, fetchCommunity, joinCommunity } from '../../../actions/community';
import CommunityDetail from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    communities: state.community.items,
    community: state.community.community
});

const mapDispatchToProps = ({
    fetchCommunities,
    fetchCommunity,
    joinCommunity
});

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
);

const CommunityDetailContainer = enhance(CommunityDetail);

export default CommunityDetailContainer;