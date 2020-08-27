import StyledSVG from '../StyledSVG';
import styled from 'styled-components';
import React from 'react';

const Wrapper = styled(StyledSVG)`
    width: 18px;
    height: 18px;
`;

const Icon = () => (
    <Wrapper xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.4 6l-.24-1.2c-.09-.46-.5-.8-.98-.8H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c.09.47.5.8.98.8H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-4.6z" />
    </Wrapper>
);

export default Icon;