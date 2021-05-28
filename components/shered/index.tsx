import { css } from '@linaria/core';

const boxShadow = css`
  box-shadow: 5px 6px 0 var(--color-border);
  border-radius: 3px;
`;

const border = css`
  border: 2px solid var(--color-border);
  border-radius: 3px;
`;

const ellipsisText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { boxShadow, border, ellipsisText };
