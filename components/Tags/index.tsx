import { css } from '@linaria/core';
import * as React from 'react';

import { TagFieldsFragment } from '@/generated/graphql';
import Link from 'next/link';

type Props = {
  tags: Array<{ __typename?: 'Tag' } & TagFieldsFragment>;
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <ul className={root}>
      {tags.map((tag) => (
        <li key={tag.id} className={tagStyle}>
          <Link href="/tags/[slug]" as={`/tags/${tag.slug}`} passHref>
            <a>#{tag.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tags;

const root = css`
  & > *:not(:last-child) {
    margin-right: 1em;
  }
`;

const tagStyle = css`
  display: inline-flex;
  font-size: var(--font-size-sm);
  cursor: pointer;
  padding: var(--spacing-size-xxs);
  border-radius: 0.03rem;
  border: 2px solid var(--color-border);
  border-radius: 3px;
  &:hover {
    opacity: 0.6;
  }
  & > a {
    color: inherit;
    text-decoration: none;
  }
`;
