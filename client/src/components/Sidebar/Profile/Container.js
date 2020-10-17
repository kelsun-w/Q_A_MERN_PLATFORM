import { connect } from 'react-redux';
import { compose } from 'redux'
import withAuth from '../../../util/withAuth';
import Profile from './Component';
import { getUser } from '../../../actions/user';

const mapStateToProps = state => ({
    isFetching: state.user.fetching,
    fetchedUser: state.user.user
});

const mapDispatchToProps = {
    getUser
};

const enhance = compose(
    withAuth,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
);

const ProfileContainer = enhance(Profile);

export default ProfileContainer;