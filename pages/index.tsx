import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cmsApi from '@/services/CMSApi';
import translationApi, { Translations } from '@/services/TranslationApi';
import { MyProfileQuery, GetPostsQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { DEFALUTL_LOCALE } from '@/constants/locales';
import { styled } from '@linaria/react';
type Props = {
  myProfile: MyProfileQuery;
  translations: Translations;
  posts: GetPostsQuery;
};

const Index: NextPage<Props> = ({ posts }) => {
  console.log(posts);
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [translations, { posts }] = await Promise.all([
    translationApi.getTranslationsByLanguageKey(locale ?? DEFALUTL_LOCALE),
    cmsApi.getPosts(),
  ]);

  if (posts.length <= 0) {
    return { notFound: true };
  }

  return {
    props: { locale, translations, posts },
  };
};
export default Index;
