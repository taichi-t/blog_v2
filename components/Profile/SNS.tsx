import { css } from '@linaria/core';
import * as React from 'react';

import GithubSvg from '@/public/images/github.svg';
import InstaGramSvg from '@/public/images/instagram.svg';
import TwitterSvg from '@/public/images/twitter.svg';

const SNS = () => {
  return (
    <ul className={root}>
      <li>
        <a>
          <GithubSvg className={svg} />
        </a>
      </li>
      <li>
        <a>
          <TwitterSvg className={svg} />
        </a>
      </li>
      <li>
        <a>
          <InstaGramSvg className={svg} />
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
