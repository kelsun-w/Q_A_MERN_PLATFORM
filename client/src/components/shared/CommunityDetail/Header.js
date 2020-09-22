import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: 500;
    & :first-child {
        margin-right: 6px;
    }
    cursor: pointer;
`

export default Header;