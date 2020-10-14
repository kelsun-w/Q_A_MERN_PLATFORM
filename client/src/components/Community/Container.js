import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import Component from './Component';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    community: state.community.community
});

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        null
    )
);

const CommunityPostListContainer = enhance(Component);

export default withRouter(CommunityPostListContainer);
