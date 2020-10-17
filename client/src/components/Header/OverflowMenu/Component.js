import styled from 'styled-components';
import React from 'react'
import NavLink from '../NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
    display: flex;
    padding-right: 1vw;

    a {
        color: ${props => props.theme.headerIcon};
    }
    
    @media (max-width:600px) {
        display: none;
    }
`;

const OverflowMenu = () => (
    <Wrapper>
        <NavLink to='/createpost/link'>
            <FontAwesomeIcon icon='pen' size='lg' />
        </NavLink>
        {/* <NavLink to='#'>
            <FontAwesomeIcon icon='comments' size='lg' />
        </NavLink> */}
        {/* <NavLink to='#'>
            <FontAwesomeIcon icon='bullhorn' size='lg' />
        </NavLink> */}
    </Wrapper>
)

export default OverflowMenu;