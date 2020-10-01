import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../util/withAuth';
import { toggleDarkTheme } from '../../actions/theme';
import UserSettingComponent from './Component';

const mapStateToProps = state => ({
    form: state.form.userSetting_display,
    form: state.form.userSetting_image,
    isDark: state.theme.dark,
});

const mapDispatchToProps = {
    toggleDarkTheme
};

const enhance = compose(
    withAuth,
    connect(mapStateToProps, mapDispatchToProps)
);

const UserSettingContainer = enhance(UserSettingComponent);

export default withRouter(UserSettingContainer);


