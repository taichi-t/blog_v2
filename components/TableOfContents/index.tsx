import { styled } from '@linaria/react';
import * as React from 'react';

type Props = {
  headingsArray: {
    title: string | null;
    id: string;
    depth: number;
  }[];
};

const TableOfContents: React.VFC<Props> = ({ headingsArray }) => {
  return (
    <ul>
      {headingsArray.map((heading) => (
        <Heading key={heading.id} depth={heading.depth}>
          <a href={`#${heading.id}`}>{heading.title}</a>
        </Heading>
      ))}
    </ul>
  );
};

export default TableOfContents;

const Heading = styled.li<{ depth: number }>`
  margin-left: ${({ depth }) => depth}em;
  color: var(--color-secondaryText);
  font-size: ${({ depth }) =>
    depth === 0 ? 'var(--font-size-md)' : 'inherit'};
  font-weight: bold;
  /* list-style: none; */
  &:hover {
    background-color: var(--color-paper);
  }
  a {
    text-decoration: none;
    display: block;
  }
`;
