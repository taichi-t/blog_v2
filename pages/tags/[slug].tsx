import { css } from '@linaria/core';
import { GetServerSideProps } from 'next';
import * as React from 'react';

import PostListItem from '@/components/PostListItem';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';

import { GetPostsByTagQuery } from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';
import translationApi from '@/services/TranslationApi';
import { BREAKPOINTS } from '@/constants/breakpoints';

type Props = {
  locale: Locales;
} & GetPostsByTagQuery;

const PostsByTagPage: React.VFC<Props> = ({ posts }) => {
  return (
    <div className={root}>
      <ul className={listLayout}>
        {posts.map((post) => {
          return <PostListItem data={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
};

const root = css`
  & > * {
    margin-bottom: var(--spacing-size-lg);
  }
  ${BREAKPOINTS.MOBILE} {
    display: flex;
    flex-direction: column;
    & > :nth-child(1) {
      order: 2;
      margin-bottom: 0;
    }
    & > :nth-child(2) {
      order: 1;
      margin-bottom: calc(
        25px + var(--spacing-size-lg)
      ); //25px for space of curcle of the profile image
    }
  }
`;

const listLayout = css`
  & > *:not(:last-child) {
    margin-bottom: var(--spacing-size-md);
  }
`;

export const getServerSideProps: GetServerSideProps = async ({
  locale = DEFALUTL_LOCALE,
  query: { slug },
}) => {
  const [translations, { posts }] = await Promise.all([
    translationApi.getTranslationsByLanguageKey(locale),
    cmsApi.getPostsByTag(locale as Locales, slug as string),
  ]);

  if (posts.length <= 0) {
    return { notFound: true };
  }

  return {
    props: { locale, translations, posts },
  };
};
export default PostsByTagPage;
