import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { LOCALES } from '@/constants/locales';

const LangSwitcher: React.VFC = () => {
  const { pathname, asPath, locales } = useRouter();

  const linkComponents = locales?.map((locale, index) => (
    <NextLink href={pathname} locale={locale} as={asPath} passHref key={index}>
      <Link>{locale === LOCALES.JA_JP ? '日本語' : 'English'}</Link>
    </NextLink>
  ));

  return <div className={Layout}>{linkComponents}</div>;
};

export default LangSwitcher;

const Layout = css`
  font-weight: bold;
  font-size: var(--font-size-lg);
  & > :nth-child(n):not(:last-of-type):after {
    content: '/';
    color: var(--color-primaryText);
    margin: 0 1rem;
  }
`;

const Link = styled('a')`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: var(--color-yellow);
  }
`;
