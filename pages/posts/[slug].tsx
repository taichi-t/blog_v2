import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { GetPostBySlugQuery } from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import MarkdownElements, { gfmMarkdownStyles } from '@/components/Markdown';
import useToggleTheme from '@/hooks/useToggleTheme';

type Props = GetPostBySlugQuery;

const PostPage: FC<Props> = ({ post }) => {
  const { onToggleTheme } = useToggleTheme();
  return (
    <div>
      <button onClick={onToggleTheme}>ダークテーマになります</button>
      <FormattedMessage defaultMessage="ssr example" />
      <ReactMarkdown
        remarkPlugins={[gfm]}
        children={post?.content || ''}
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
