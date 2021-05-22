import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';

import Pagenation from '@/components/Pagination';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { POSTS_LIMIT } from '@/constants/meta';
import {
  GetPostsByPageQuery,
  GetPostsCountQuery,
  GetTagsQuery,
  PostOrderByInput,
} from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';
import translationApi from '@/services/TranslationApi';

type Props = {
  locale: Locales;
} & GetPostsByPageQuery &
  GetTagsQuery &
  GetPostsCountQuery;

const Index: NextPage<Props> = ({ posts, postsConnection }) => {
  const postLinkComponents = posts.map((post) => {
    return (
      <Link href={`/posts/${post.slug}`} key={post.slug}>
        {post.title}
      </Link>
    );
  });

  return (
    <div>
      {postLinkComponents}
      <Pagenation count={postsConnection.aggregate.count} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale = DEFALUTL_LOCALE,
  query,
}) => {
  const { page } = query;
  const skipByPagination = page && Number(page) * POSTS_LIMIT;
  const skipBydefault = 0;
  const [
    translations,
    { tags },
    { posts },
    { postsConnection },
  ] = await Promise.all([
    translationApi.getTranslationsByLanguageKey(locale),
    cmsApi.getTags(),
    cmsApi.getPostsByPage(
      skipByPagination || skipBydefault,
      locale as Locales,
      PostOrderByInput.CreatedAtDesc,
      POSTS_LIMIT
    ),
    cmsApi.getPostsCount(),
  ]);
  //TODO: together bunch of cmsAPI functions

  if (posts.length <= 0) {
    return { notFound: true };
  }

  return {
    props: { locale, translations, tags, posts, postsConnection },
  };
};
export default Index;
