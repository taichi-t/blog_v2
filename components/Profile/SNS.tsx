import { css } from '@linaria/core';
import * as React from 'react';

import GithubSvg from '@/public/images/github.svg';
import TwitterSvg from '@/public/images/twitter.svg';
import { SNS as SNSLINK } from '@/constants/sns';

const SNS = () => {
  return (
    <ul className={root}>
      <li>
        <a href={SNSLINK.GITHUB} target="_blank" rel="noopener noreferrer">
          <GithubSvg className={svg} />
        </a>
      </li>
      <li>
        <a href={SNSLINK.TWITTER} target="_blank" rel="noopener noreferrer">
          <TwitterSvg className={svg} />
        </a>
      </li>
    </ul>
  );
};

export default SNS;

const svg = css`
  fill: var(--color-primaryText);
  height: var(--font-size-xl);
  width: var(--font-size-xl);
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const root = css`
  list-style: none;
  display: flex;
  & > *:not(:last-child) {
    margin-right: var(--spacing-size-sm);
  }
`;
