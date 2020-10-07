import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import {
    fetchCommunity,
    updateCommunity,
    imageUpload,
    assignMod,
    addRule,
    removeRule,
} from '../../actions/community';
import ModerationComponent from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching,
    community: state.community.community,
});

const mapDispatchToProps = {
    fetchCommunity,
    updateCommunity,
    imageUpload,
    assignMod,
    addRule,
    removeRule
};

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const ModerationContainer = enhance(ModerationComponent);

export default withRouter(ModerationContainer);


