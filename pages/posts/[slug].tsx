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
import translationApi from '@/services/TranslationApi';
import { BREAKPOINTS } from '@/constants/breakpoints';

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
      <article ref={markdownRef} className={markdownLayout}>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[slug]}
          children={post?.content ?? ''}
          components={MarkdownElements}
          className={gfmMarkdownStyles}
        />
      </article>

      <div className={tableOfContentsSwichLayout}>
        {isOpenPopper && (
          <TableOfContents
            headingsArray={headingsArray}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          />
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

  const [translations, { post }] = await Promise.all([
    // TODO: cache translations
    translationApi.getTranslationsByLanguageKey(locale),
    cmsApi.getPostBySlug(locale as Locales, slug as string),
  ]);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      locale,
      translations,
    },
  };
};

export default PostPage;

const tableOfContentsSwichLayout = css`
  position: fixed;
  bottom: 10%;
  right: 10%;
  ${BREAKPOINTS.MOBILE} {
    bottom: 5%;
    right: 5%;
  }
`;

const markdownLayout = css`
  & ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
`;
