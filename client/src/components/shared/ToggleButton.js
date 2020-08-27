import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { transition } from './helpers';

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 18px;

    :before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        -webkit-transition: .4s;
        transition: .4s;
    }
`;

const Switch = styled.label`
    position: absolute;
    right: 0;
    margin-right:8px;
    display: inline-block;
    width: 30px;
    height: 18px;

    input {
        opacity: 100%;
        width: 10px;
        height: 10px;
    }

    input:checked + ${Slider} {
        background-color: #2196F3;
    }

    input:focus + ${Slider} {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + ${Slider}:before {
        -webkit-transform: translateX(12px);
        -ms-transform: translateX(12px);
        transform: translateX(12px);
    }
`;

const ToggleButton = ({ defaultState }) => {
    const [isChecked, setChecked] = useState(defaultState);
    //Super buggy code -> Updated value is rendered late and cannot click twice to change value

    return (
        <Switch>
            <input type="checkbox" checked={isChecked} onChange={e => setChecked(e.currentTarget.checked)}/>
        </Switch>
    );
}

export default ToggleButton;
