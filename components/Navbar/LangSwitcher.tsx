import { css } from '@linaria/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const LangSwitcher: React.VFC = () => {
  const { pathname, asPath, locales } = useRouter();

  const linkComponents = locales?.map((locale, index) => (
    <li key={index}>
      <Link href={pathname} locale={locale} as={asPath} passHref>
        <a>{locale}</a>
      </Link>
    </li>
  ));

  return <div className={Layout}>{linkComponents}</div>;
};

export default LangSwitcher;

const Layout = css``;
