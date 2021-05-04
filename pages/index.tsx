import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cmsApi from '@/services/CMSApi';
import translationApi, { Translations } from '@/services/TranslationApi';
import { MyProfileQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { DEFALUTL_LOCALE } from '@/constants/locales';
type Props = {
  myProfile: MyProfileQuery;
  translations: Translations;
};

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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [myProfile, translations] = await Promise.all([
    cmsApi.getMyProfile(),
    translationApi.getTranslationsByLanguageKey(locale ?? DEFALUTL_LOCALE),
  ]);
  return {
    props: { myProfile, locale, translations },
  };
};
export default Index;
