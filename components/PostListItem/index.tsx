import { css, cx } from '@linaria/core';
import Link from 'next/link';
import * as React from 'react';
import { FormattedDate } from 'react-intl';

import Tags from '@/components/Tags';
import { Post, TagFieldsFragment } from '@/generated/graphql';

type Props = {
  data: { __typename?: 'Post' | undefined } & Pick<
    Post,
    'title' | 'id' | 'updatedAt' | 'createdAt' | 'excerpt' | 'slug'
  > & { tags: Array<{ __typename?: 'Tag' } & TagFieldsFragment> };
};

const PostListItem: React.VFC<Props> = ({ data }) => {
  return (
    <li className={root}>
      <Link
        href={'/[slug]'}
        key={data.slug}
        as={`/${data.slug}`}
        passHref
        prefetch={false}>
        <a className={cx(titleStyle)}>{data.title}</a>
      </Link>

      <h3 className={cx(excerptStyle)}>{data.excerpt}</h3>

      <FormattedDate
        value={data.createdAt}
        year="numeric"
        month="short"
        day="2-digit"
        children={(text) => <p className={createdAtStyle}>{text}</p>}
      />

      <Tags tags={data.tags} />
    </li>
  );
};

export default PostListItem;

const titleStyle = css`
  display: block;
  font-size: var(--font-size-lg);
  font-weight: bold;
  &:before {
    content: '📝 ';
    font-size: var(--font-size-lg);
  }
`;

const excerptStyle = css`
  color: var(--color-secondaryText);
  font-size: var(--font-size-base);
  font-weight: bold;
`;

const createdAtStyle = css`
  color: var(--color-secondaryText);
  font-size: var(--font-size-base);
`;

const root = css`
  & > *:not(:last-child) {
    margin-bottom: var(--spacing-size-xs);
  }
`;
