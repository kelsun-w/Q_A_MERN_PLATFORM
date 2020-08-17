import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../../util/withAuth';
import { logout } from '../../../../actions/auth';
import { toggleDarkTheme } from '../../../../actions/theme';
import Menu from './Component';

const mapDispatchToProps = { logout, toggleDarkTheme };

const enhance = compose(
    withAuth,
    connect(null, mapDispatchToProps)
);

const MenuContainer = enhance(Menu);

export default MenuContainer;