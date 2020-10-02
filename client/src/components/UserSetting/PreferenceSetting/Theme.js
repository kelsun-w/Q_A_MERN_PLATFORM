import React from 'react';
import { StyledList, StyledListItem } from '../helpers';

class ThemeSetting extends React.Component {

    toggleTheme = e => {
        const { toggleTheme } = this.props;
        toggleTheme();
    }

    render() {
        return (
            <StyledList light>
                <StyledListItem>
                    <input
                        type='radio'
                        id='light'
                        name='theme'
                        onChange={this.toggleTheme}
                        checked={!this.props.isDark}
                    />
                    <label>LIGHT</label>
                </StyledListItem>
                <StyledListItem>
                    <input
                        type='radio'
                        id='dark'
                        name='theme'
                        onChange={this.toggleTheme}
                        checked={this.props.isDark}
                    />
                    <label>DARK</label>
                </StyledListItem>
            </StyledList>
        )
    }
};

export default ThemeSetting;