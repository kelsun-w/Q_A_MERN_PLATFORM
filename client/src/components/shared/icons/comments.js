import StyledSVG from '../StyledSVG';
import styled from 'styled-components';
import React from 'react';

const Wrapper = styled(StyledSVG)`
    width: 16px;
    height: 16px;
`;

const Icon = () => (
    <Wrapper xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none" /><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </Wrapper>
);

export default Icon;