import { css } from '@linaria/core';

const boxShadowStyle = css`
  box-shadow: 5px 6px 0 var(--color-border);
  border-radius: 3px;
`;

const borderStyle = css`
  border: 2px solid var(--color-border);
  border-radius: 3px;
`;

const ellipsisTextStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { borderStyle, boxShadowStyle, ellipsisTextStyle };
