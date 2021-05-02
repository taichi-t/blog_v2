import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import cmsApi from '@/services/CMSApi';
import translationApi, { Translations } from '@/services/TranslationApi';
import { MyProfileQuery } from '@/generated/graphql';
import { DEFALUTL_LOCALE } from '@/constants/locale';

type Props = {
  myProfile: MyProfileQuery;
  translations: Translations;
};

const Index: NextPage<Props> = () => {
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
          <Link href="/ssr">
            <a>
              <FormattedMessage defaultMessage="SSR" />
            </a>
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale = DEFALUTL_LOCALE,
}) => {
  const [myProfile, translations] = await Promise.all([
    cmsApi.getMyProfile(),
    translationApi.getTranslationsByLanguageKey(locale),
  ]);
  return {
    props: { myProfile, translations },
  };
};
export default Index;
