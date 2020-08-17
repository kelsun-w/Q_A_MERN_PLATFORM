import styled from "styled-components";
import React from 'react';
import { transition } from './helpers';

const StyledSVG = styled.svg`
    ${transition('fill')};
    fill: ${props => props.theme.mutedText};
    width: 20px;
    height: 20px;
`

export default StyledSVG;