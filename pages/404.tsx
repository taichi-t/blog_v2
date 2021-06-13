import SEO from '@/components/SEO';
import { DEFALUTL_LOCALE } from '@/constants/locales';
import { WEBSITE } from '@/constants/website';
import useUrl from '@/hooks/useUrl';
import { css } from '@linaria/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Custom404 = () => {
  const { locale } = useRouter();
  const url = useUrl();
  const metaDescription = WEBSITE.NOTFOUNDPAGE[
    (locale ?? DEFALUTL_LOCALE).replace('-', '_').toUpperCase()
  ].DESCRIPTION as string;
  const metaTitle = WEBSITE.NOTFOUNDPAGE[
    (locale ?? DEFALUTL_LOCALE).replace('-', '_').toUpperCase()
  ].TITLE as string;
  return (
    <>
      <SEO
        title={`${metaTitle} - ${WEBSITE.NAME}`}
        pageType={'blog'}
        description={metaDescription}
        locale={locale ?? DEFALUTL_LOCALE}
        pageUrl={url}
      />
      <div className={root}>
        <p className={statusStyle}>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </p>
        <FormattedMessage
          defaultMessage="This page does not exist"
          children={(text) => <p className={messageStyle}>{text}</p>}
        />
        <FormattedMessage
          defaultMessage="Return to Home Page"
          children={(text) => (
            <Link href="/" passHref shallow>
              <a>{text}</a>
            </Link>
          )}
        />
      </div>
    </>
  );
};

export default Custom404;

const root = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(80vh - 100px);
  & > *:not(:last-child) {
    margin-bottom: var(--spacing-size-sm);
  }
`;

const statusStyle = css`
  transform: skew(-10deg) rotate(-10deg);
  text-align: center;
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px,
    #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px, #533d4a 7px 7px,
    #533d4a 8px 8px;
  font-size: 15rem;
  font-weight: bold;
  & > *:nth-child(1) {
    color: var(--color-red);
  }
  & > *:nth-child(2) {
    color: var(--color-green);
  }
  & > *:nth-child(3) {
    color: var(--color-yellow);
  }
`;

const messageStyle = css`
  font-size: var(--font-size-md);
`;
