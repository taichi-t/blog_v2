import { css } from '@linaria/core';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';

import PostListItem from '@/components/PostListItem';
import Profile from '@/components/Profile';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { POSTS_LIMIT } from '@/constants/meta';
import { GetIndexContentQuery, PostOrderByInput } from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';
import translationApi from '@/services/TranslationApi';

type Props = {
  locale: Locales;
} & GetIndexContentQuery;

const Index: NextPage<Props> = ({ posts }) => {
  return (
    <div className={root}>
      <Profile />
      <ul className={listLayout}>
        {posts.map((post) => {
          return <PostListItem data={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

const root = css`
  & > :nth-of-type(n) {
    margin: 0 auto;
    margin-bottom: var(--spacing-size-lg);
  }
`;

const listLayout = css`
  & > :not(:last-of-type):nth-of-type(n) {
    margin-bottom: var(--spacing-size-md);
  }
`;

export const getServerSideProps: GetServerSideProps = async ({
  locale = DEFALUTL_LOCALE,
}) => {
  const defaultSkip = 0;
  const [translations, { tags, posts, postsConnection }] = await Promise.all([
    translationApi.getTranslationsByLanguageKey(locale),
    cmsApi.getIndexContent(
      defaultSkip,
      locale as Locales,
      PostOrderByInput.CreatedAtDesc,
      POSTS_LIMIT
    ),
  ]);

  if (posts.length <= 0) {
    return { notFound: true };
  }

  return {
    props: { locale, translations, tags, posts, postsConnection },
  };
};
export default Index;
