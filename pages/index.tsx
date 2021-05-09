import { styled } from '@linaria/react';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const Index: NextPage<Props> = () => {
  const handleDarkTheme = () => {
    const attribute = document.documentElement.getAttribute('data-theme');
    if (attribute === 'dark') {
      document.documentElement.setAttribute('data-theme', 'none');
      return;
    }
    document.documentElement.setAttribute('data-theme', 'dark');
  };

  const { pathname, asPath, locales } = useRouter();
  const linkComponents = locales?.map((locale, index) => (
    <li key={index}>
      <Link href={pathname} locale={locale} as={asPath} passHref>
        <a>{locale}</a>
      </Link>
    </li>
  ));
  return (
    <div>
      <FormattedMessage defaultMessage="hello" />
      <ul>
        <li>
          <Link href="/about">
            <FormattedMessage defaultMessage="about" />
          </Link>
        </li>
        {linkComponents}
        <li>
          <Link href="/ssg">
            <a>
              <FormattedMessage defaultMessage="SSG" />
            </a>
          </Link>
        </li>
      </ul>
      <Text>赤色のテキストです</Text>
      <button onClick={handleDarkTheme}>ダークテーマになります</button>
    </div>
  );
};

const Text = styled('li')`
  color: red;
`;

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
