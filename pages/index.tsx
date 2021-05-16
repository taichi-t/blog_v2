import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { POSTS_LIMIT } from '@/constants/meta';
import {
  GetPostsByPageQuery,
  GetTagsQuery,
  PostOrderByInput,
} from '@/generated/graphql';
import cmsApi from '@/services/CMSApi';
import translationApi from '@/services/TranslationApi';

type Props = {
  locale: Locales;
} & GetPostsByPageQuery &
  GetTagsQuery;

const Index: NextPage<Props> = ({ posts }) => {
  const postLinkComponents = posts.map((post) => {
    return (
      <Link href={`/posts/${post.slug}`} key={post.slug}>
        {post.title}
      </Link>
    );
  });

  return (
    <div>
      <FormattedMessage defaultMessage="hello" />
      <ul>
        <li>
          <Link href="/about">
            <FormattedMessage defaultMessage="about" />
          </Link>
        </li>
        <li>
          <Link href="/ssg">
            <a>
              <FormattedMessage defaultMessage="SSG" />
            </a>
          </Link>
        </li>
      </ul>
      <ul>{postLinkComponents}</ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale = DEFALUTL_LOCALE,
}) => {
  const skip = 0;
  const [translations, { tags }, { posts }] = await Promise.all([
    translationApi.getTranslationsByLanguageKey(locale),
    cmsApi.getTags(),
    cmsApi.getPostsByPage(
      skip,
      locale as Locales,
      PostOrderByInput.CreatedAtDesc,
      POSTS_LIMIT
    ),
  ]);

  if (posts.length <= 0) {
    return { notFound: true };
  }

  return {
    props: { locale, translations, tags, posts },
  };
};
export default Index;
