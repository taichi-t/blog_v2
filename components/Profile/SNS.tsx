import * as React from 'react';
import GithubSvg from '@/public/images/github.svg';
import TwitterSvg from '@/public/images/twitter.svg';
import InstaGramSvg from '@/public/images/instagram.svg';
import { css } from '@linaria/core';

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
`;

const root = css`
  list-style: none;
  display: flex;
  & > :not(:last-of-type):nth-of-type(n) {
    margin-right: var(--spacing-size-sm);
  }
`;
