import { connect } from 'react-redux';
import { compose } from 'redux'
import withAuth from '../../../util/withAuth';
import Profile from './Component';

const mapStateToProps = state => ({
    isFetching: state.community.isFetching
});

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        null
    )
);

const ProfileContainer = enhance(Profile);

export default ProfileContainer;