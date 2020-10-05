import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import {
    fetchCommunity,
    assignMod
} from '../../actions/community';
import ModerationComponent from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    community: state.community.community,
});

const mapDispatchToProps = {
    fetchCommunity,
    assignMod
};

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const ModerationContainer = enhance(ModerationComponent);

export default withRouter(ModerationContainer);


