import React, { useState } from 'react';
import ToggleOption from './ToggleOption/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToggleDarkOption = ({ defaultState, toggleDarkTheme }) => {
    const [isChecked, setChecked] = useState(defaultState);

    const handleToggleDark = e => {
        console.log(e.currentTarget.checked);
    }

    return (
        <ToggleOption
            destination='#'
            handleToggle={toggleDarkTheme}
            defaultState={isChecked}>

            <FontAwesomeIcon icon='moon' />
            <span>Darkmode</span>

        </ToggleOption>
    );
};

export default ToggleDarkOption;