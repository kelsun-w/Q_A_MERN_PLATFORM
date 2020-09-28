import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import UserSettingComponent from './Component';

const mapStateToProps = state => ({
    form: state.form.userSetting_display,
    form: state.form.userSetting_image
});

//   const mapDispatchToProps = { attemptCreatePost };

const enhance = compose(
    connect(
        mapStateToProps
        //   mapDispatchToProps
    ),
    withAuth
);

const UserSettingContainer = enhance(UserSettingComponent);

export default UserSettingContainer;


