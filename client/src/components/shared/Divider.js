import styled from 'styled-components';
import React from 'react';

const Divider = styled.div`
    display: block;
    border-top: 1.5px solid ${props => props.theme.border};
    margin: 0 14px;
`;

export default Divider;