import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cmsApi from '@/services/CMSApi';
import translationApi from '@/services/TranslationApi';
import {
  PostOrderByInput,
  GetPostsByPageQuery,
  GetTagsQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { DEFALUTL_LOCALE, Locales } from '@/constants/locales';
import { POSTS_LIMIT } from '@/constants/meta';
import { styled } from '@linaria/react';

type Props = {
  locale: Locales;
} & GetPostsByPageQuery &
  GetTagsQuery;

const Index: NextPage<Props> = () => {
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
