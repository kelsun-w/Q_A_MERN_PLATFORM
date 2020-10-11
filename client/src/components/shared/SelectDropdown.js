import React from 'react';
import styled from 'styled-components';
import SelectWrapper from './form/SelectWrapper';
import Input from './form/Input';

const StyledInput = styled(Input)`
    min-width: 150px;
    border: 2px solid ${props => props.theme.border};
    :hover,
    :focus {
        border: 2px solid ${props => props.theme.accent};
    }
`;

const Dropdown = ({ children, value, handleChange }) => (
    <SelectWrapper>
        <StyledInput as='select' type='select' value={value} onChange={handleChange}>
            {children}
        </StyledInput>
    </SelectWrapper>
);

export default Dropdown;