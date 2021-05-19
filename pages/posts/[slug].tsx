import { GetServerSideProps } from 'next';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import MarkdownElements, { gfmMarkdownStyles } from '@/components/Markdown';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { GetPostBySlugQuery } from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';

type Props = GetPostBySlugQuery;

const PostPage: FC<Props> = ({ post }) => {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        children={post?.content ?? ''}
        components={MarkdownElements}
        className={gfmMarkdownStyles}
      />
    </div>
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
