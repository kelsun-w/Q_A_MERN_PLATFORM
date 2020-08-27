import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import DropdownToggle from './Card/ProfileCard';
import DropdownContent from './DropdownContent/Container';

const Wrapper = styled.div`
  flex-shrink: 1;
  display: flex;
  align-items: center;
  position: relative;
`;

const Dropdown = ({ user }) => {
  const [isOpen, setOpen] = useState(false);
  const menu = useRef(null);

  const toggleMenu = event => {
    isOpen ? closeMenu(event) : setOpen(true);
  };

  const closeMenu = event => {
    if (!menu.current.contains(event.target)) {
      setOpen(false);
      document.removeEventListener('click', closeMenu)
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeMenu);
    }
    return () => {
      document.removeEventListener('click', closeMenu);
    }
  });

  return (
    <Wrapper>
      <DropdownToggle user={user} onClick={toggleMenu} active={isOpen} />
      {isOpen ?
        <div ref={menu}>
          <DropdownContent />
        </div>
        :
        null}
    </Wrapper>
  );
};

export default Dropdown;
