import { connect } from 'react-redux';
import { compose } from 'redux'
import withAuth from '../../util/withAuth';
import { fetchCommunities } from '../../actions/community';
import Component from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    communities: state.community.items
});

const mapDispatchToProps = ({
    fetchCommunities
});

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const DiscoverMenu = enhance(Component);

export default DiscoverMenu;