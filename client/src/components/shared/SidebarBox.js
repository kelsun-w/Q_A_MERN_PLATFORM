import React, { Children } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 8px 16px;
`

const Header = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${props=> props.theme.normalText}
`

const SidebarBox = (props)(
    <Wrapper>
        <Header>{props.title}</Header>
        {props.children}
    </Wrapper> >
)