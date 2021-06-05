import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BREAKPOINTS } from '@/constants/breakpoints';

import { LOCALES } from '@/constants/locales';

const LangSwitcher: React.VFC = () => {
  const { pathname, asPath, locales } = useRouter();

  const linkComponents = locales?.map((locale, index) => (
    <NextLink href={pathname} locale={locale} as={asPath} passHref key={index}>
      <Link>{locale === LOCALES.JA_JP ? '日本語' : 'English'}</Link>
    </NextLink>
  ));

  return <div className={layout}>{linkComponents}</div>;
};

export default LangSwitcher;

const layout = css`
  font-weight: bold;
  font-size: var(--font-size-lg);
  & > *:not(:last-child):after {
    content: '/';
    color: var(--color-primaryText);
    margin: 0 var(--spacing-size-xs);
  }
  ${BREAKPOINTS.MOBILE} {
    font-size: var(--font-size-md);
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
