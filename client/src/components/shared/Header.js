import styled, { css } from 'styled-components';
import { normalFont, bigFont } from './helpers';

const Header = styled.div`
    ${({ small }) =>
        small ? css`${normalFont}` : css`${bigFont}`
    };
    border-bottom: ${({ noBorder }) => noBorder ? `` : css`1.5px solid ${props => props.theme.border}`};
    color: ${props => props.danger && props.theme.danger};
`

export default Header;