import styled from 'styled-components';
import { bigFont } from './helpers';

const Header = styled.div`
    ${bigFont};
    border-bottom: 1.5px solid ${props => props.theme.border};
`

export default Header;