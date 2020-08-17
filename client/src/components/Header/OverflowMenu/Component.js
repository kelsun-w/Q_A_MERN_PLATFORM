import styled from 'styled-components';
import React from 'react'
import NavLink from '../NavLink';
import PostIcon from '../../shared/icons/create_post';
import MessageIcon from '../../shared/icons/message';
import NotificationIcon from '../../shared/icons/notification';

const Wrapper = styled.div`
    display: flex;

    @media (max-width:600px) {
        display: none;
    }
`;

const OverflowMenu = () => (
    <Wrapper>
        <NavLink to='/createpost'>
            <PostIcon />
        </NavLink>
        <NavLink to='#'>
            <MessageIcon />
        </NavLink>
        <NavLink to='#'>
            <NotificationIcon />
        </NavLink>
    </Wrapper>
)

export default OverflowMenu;