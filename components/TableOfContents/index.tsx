import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { borderStyle } from '@/components/shered';

type Props = {
  headingsArray: {
    title: string | null;
    id: string;
    depth: number;
  }[];
} & JSX.IntrinsicElements['ul'];

const TableOfContents = React.forwardRef<HTMLUListElement, Props>(
  ({ headingsArray, ...rest }, ref) => {
    const handleSmoothScrollByHash = React.useCallback(
      (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        id: string | null
      ) => {
        e.preventDefault();
        if (!id) return;
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      },
      []
    );

    return (
      <ul ref={ref} {...rest} className={cx(root, borderStyle)}>
        <HeadingsTitle>
          <FormattedMessage defaultMessage="Table of contens" />
        </HeadingsTitle>
        {headingsArray.map((heading) => (
          <Heading key={heading.id} depth={heading.depth}>
            <Link href={`#${heading.id}`} passHref>
              <a onClick={(e) => handleSmoothScrollByHash(e, heading.id)}>
                {heading.title}
              </a>
            </Link>
          </Heading>
        ))}
      </ul>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';

export default TableOfContents;

const root = css`
  padding: var(--spacing-size-xs);
  background-color: var(--color-paper);
  width: 30rem;
`;

const HeadingsTitle = styled.h2`
  font-weight: bold;
`;

const Heading = styled.li<{ depth: number }>`
  margin-left: ${({ depth }) => depth}em;
  color: var(--color-secondaryText);
  font-size: ${({ depth }) =>
    depth === 0 ? 'var(--font-size-md)' : 'inherit'};
  font-weight: bold;
  list-style: none;
  & > :not(last-of-type):nth-of-type(n) {
    margin: 1rem 0;
  }
  &:hover {
    background-color: var(--color-paper);
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    display: block;
  }
`;
