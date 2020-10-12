import { css, keyframes } from 'styled-components';

export const font = css`
  font-weight: ${props => props.light ? 300 : 500};
  text-transform: ${props => props.allcaps ? 'uppercase' : ''};
`;

export const smallFont = css`
  ${font};
  font-size: 13px;
`;

export const normalFont = css`
  ${font};
  font-size: 16px;
`;

export const bigFont = css`
  ${font};
  font-size: 24px;
`;

export const wideFont = css`
  ${smallFont};
  letter-spacing: 0.05em;
`;

const fadeKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fade = css`
  animation: ${fadeKeyframes} 0.25s;
`;

export const transition = (...props) => {
  let str = 'transition: ';
  props.forEach((item, index) => {
    str = str.concat(
      `${item} 0.2s ease${index === props.length - 1 ? ';' : ', '}`
    );
  });
  return str;
};

export const headerItem = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 16px;

  @media (max-width: 425px) {
    padding: 0 8px;
  }
`;

export const link = props => css`
  ${transition('color')};

  text-underline-position: under;
  text-decoration: none;
  color: ${props => props.theme.normalText};

  &:hover * {
    ${props.underline && 'text-decoration: underline'};
    color: ${props => props.theme.accent};
  }
`;

export const overflow = css`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;
