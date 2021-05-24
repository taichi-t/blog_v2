import { GetServerSideProps } from 'next';
import { FC } from 'react';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import slug from 'rehype-slug';
import gfm from 'remark-gfm';

import MarkdownElements, { gfmMarkdownStyles } from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { GetPostBySlugQuery } from '@/generated/graphql';
import getFormattedHeadingsArray from '@/helpers/getFormattedHeadingsArray';
import cmsApi from '@/services/CMSApi';

type Props = GetPostBySlugQuery;

const PostPage: FC<Props> = ({ post }) => {
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

  return (
    <>
      <div ref={markdownRef}>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          rehypePlugins={[slug]}
          children={post?.content ?? ''}
          components={MarkdownElements}
          className={gfmMarkdownStyles}
        />
      </div>
      <TableOfContents headingsArray={headingsArray} />
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
