import { BREAKPOINTS } from '@/constants/breakpoints';
import { css } from '@linaria/core';
import * as React from 'react';

import Description from './Description';
import Name from './Name';
import SNS from './SNS';

const Column2 = () => {
  return (
    <div className={root}>
      <div>
        <Name />
        <Description />
      </div>
      <SNS />
    </div>
  );
};

export default Column2;

const root = css`
  text-align: left;
  display: grid;
  & > * {
    align-self: center;
  }
  ${BREAKPOINTS.MOBILE} {
    & > *:not(:last-child) {
      margin-bottom: var(--spacing-size-xs);
    }
  }
`;
