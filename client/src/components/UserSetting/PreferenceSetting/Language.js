import React from 'react';
import { StyledList, StyledListItem } from '../helpers';

class LanguageSetting extends React.Component {

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
                        id='eng'
                        name='lang'
                        onChange={this.toggleTheme}
                        checked={!this.props.isDark}
                    />
                    <label>ENGLISH</label>
                </StyledListItem>
                <StyledListItem>
                    <input
                        type='radio'
                        id='th'
                        name='lang'
                        onChange={this.toggleTheme}
                        checked={this.props.isDark}
                    />
                    <label>THAI</label>
                </StyledListItem>
            </StyledList>
        )
    }
};

export default LanguageSetting;