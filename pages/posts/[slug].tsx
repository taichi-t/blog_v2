import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { GetPostBySlugQuery } from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';

type Props = GetPostBySlugQuery;

const PostPage: FC<Props> = () => {
  return (
    <div>
      <FormattedMessage defaultMessage="ssr example" />
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

  const [{ post }] = await Promise.all([
    cmsApi.getPostBySlug(locale as Locales, slug as string),
  ]);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
  };
};

export default PostPage;
