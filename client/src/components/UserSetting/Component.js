import { Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import ProfileSetting from './ProfileSetting';
import PreferenceSetting from './PreferenceSetting';

const Wrapper = styled.div`
    background-color: ${props => props.theme.foreground};
    color: ${props => props.theme.normalText};
    padding: 8px;
    border-radius: 4px;
`

class UserSetting extends React.Component {

    componentDidMount() {
        if (!this.props.token) { this.props.history.push('/') }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.token) { this.props.history.push('/') }
    };

    render() {
        if(!this.props.token) return null;

        const { user, isDark, toggleDarkTheme } = this.props;
        const preference = {
            id: user.id,
            isDark: isDark,
            toggleTheme: toggleDarkTheme
        }

        return (
            <Wrapper>
                <Route
                    exact path='/settings'
                    render={() => (
                        <ProfileSetting
                            {...user}
                        />
                    )}
                />
                <Route
                    exact path='/settings/preference'
                    render={() => (
                        <PreferenceSetting
                            {...preference}
                        />
                    )}
                />
            </Wrapper>
        )
    }
};

export default UserSetting;