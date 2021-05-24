import { GetServerSideProps } from 'next';
import { FC } from 'react';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import slug from 'rehype-slug';
import gfm from 'remark-gfm';
import { css } from '@linaria/core';

import MarkdownElements, { gfmMarkdownStyles } from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import ContentsSwich from '@/components/TableOfContents/ContentsSwich';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { GetPostBySlugQuery } from '@/generated/graphql';
import getFormattedHeadingsArray from '@/helpers/getFormattedHeadingsArray';
import cmsApi from '@/services/CMSApi';
import { usePopper } from 'react-popper';

type Props = GetPostBySlugQuery;

const PostPage: FC<Props> = ({ post }) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLUListElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });
  const [isOpenPopper, setIsOpenPopper] = React.useState(false);
  const markdownRef = React.useRef<HTMLDivElement | null>(null);
  const [headingsArray, setHeadingsArray] = React.useState<
    | {
        title: string | null;
        id: string;
        depth: number;
      }[]
    | []
  >([]);

  React.useEffect(() => {
    if (markdownRef.current) {
      const headingElements = Array.from(
        markdownRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6')
      );

      const formattedHeadingsArray = getFormattedHeadingsArray(headingElements);
      setHeadingsArray(formattedHeadingsArray);
    }
  }, [post]);

  const handleTogglePopper = () => {
    setIsOpenPopper(!isOpenPopper);
  };

  return (
    <>
      <article ref={markdownRef} className={MarkdownLayout}>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[slug]}
          children={post?.content ?? ''}
          components={MarkdownElements}
          className={gfmMarkdownStyles}
        />
      </article>

      <div className={TableOfContentsSwichLayout}>
        {isOpenPopper && (
          <>
            <TableOfContents
              headingsArray={headingsArray}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            />
          </>
        )}

        <ContentsSwich ref={setReferenceElement} onClick={handleTogglePopper} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { slug },
  locale = DEFALUTL_LOCALE,
}) => {
  if (!slug) {
    return { notFound: true };
  }

  const { post } = await cmsApi.getPostBySlug(
    locale as Locales,
    slug as string
  );

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: post,
    },
  };
};

export default PostPage;

const TableOfContentsSwichLayout = css`
  position: fixed;
  bottom: 15%;
  right: 20%;
`;

const MarkdownLayout = css`
  padding: var(--spacing-size-xs);
`;
