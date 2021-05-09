import 'normalize.css';

import { css } from '@linaria/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { DEFALUTL_LOCALE } from '@/constants/locales';
import DEFAULT_MESSAGES from '@/lang/en-US.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
    return () => {
      Router.events.off('routeChangeStart', () => {
        NProgress.start();
      });
      Router.events.off('routeChangeComplete', () => NProgress.done());
      Router.events.off('routeChangeError', () => NProgress.done());
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700"
          rel="stylesheet"
        />
      </Head>
      <IntlProvider
        messages={pageProps.translations ?? DEFAULT_MESSAGES}
        locale={pageProps.locale ?? DEFALUTL_LOCALE}
        defaultLocale={DEFALUTL_LOCALE}
        onError={(error) => {
          if (error.code === 'MISSING_DATA') return;
          throw error;
        }}>
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
};

export default App;

export const global = css`
  :global() {
    :root {
      /* bg-color */
      --color-background: #ffffff;
      --color-paper: #fafafa;
      --color-skeleton: #e0e0e0;

      /* skeleton */
      --color-gradient100: rgba(255, 255, 255, 0);
      --color-gradient200: rgba(255, 255, 255, 0.2);
      --color-gradient300: rgba(255, 255, 255, 0.5);

      /* font-color */
      --color-primaryText: rgba(0, 0, 0, 0.87);
      --color-secondaryText: rgba(0, 0, 0, 0.54);

      /* key color */
      --color-blue: #1a0dab;
      --color-bioret: rgba(102, 0, 53);

      /* key color opacity */
      --color-opacityYellow: rgba(242, 191, 94, 0.6);
      --color-opacityBlue: rgba(26, 13, 171, 0.6);
      --color-opacityBioret: rgba(193, 180, 251, 0.6);
      --color-opacityRed: rgba(255, 97, 97, 0.6);
      --color-opacityGreen: rgba(186, 218, 85, 0.6);

      /* devider */
      --color-border: #000000;
      --color-inner: #e0e0e0;
      --color-divider: #e6ecf0;

      /* font-size */
      --font-size-xl: 3.2rem;
      --font-size-lg: 2.4rem;
      --font-size-md: 1.8rem;
      --font-size-base: 1.6rem;
      --font-size-sm: 1.2rem;
      --font-size-xs: 0.8rem;

      /* spacing */
      --spacing-size-xxl: 6rem;
      --spacing-size-xl: 5.2rem;
      --spacing-size-lg: 4.8rem;
      --spacing-size-md: 4rem;
      --spacing-size-base: 3.2rem;
      --spacing-size-sm: 1.6rem;
      --spacing-size-xs: 0.8rem;
    }

    //override root color valiable when darkmode
    [data-theme='dark'] {
      /* bg-color */
      --color-background: #15202b;
      --color-paper: #192834;
      --color-skeleton: #2a343d;

      /* skeleton */
      --color-gradient100: rgba(106, 113, 131, 0);
      --color-gradient200: rgba(106, 113, 131, 0.2);
      --color-gradient300: rgba(106, 113, 131, 0.5);

      /* font-color */
      --color-primaryText: #fefffe;
      --color-secondaryText: #8899a6;

      /* key-color */
      --color-blue: #7ec9ed;

      /* key color opacity */
      --color-opacityYellow: rgba(242, 191, 94, 0.7);
      --color-opacityBlue: rgba(126, 201, 237, 0.7);
      --color-opacityBioret: rgba(193, 180, 251, 0.7);
      --color-opacityRed: rgba(255, 97, 97, 0.7);
      --color-opacityGreen: rgba(186, 218, 85, 0.7);

      /* divider */
      --color-border: #fff;
      --color-inner: #2a343d;
      --color-divider: rgba(255, 255, 255, 0.12);
    }
    html {
      font-size: 62.5%;
      color: var(--color-primaryText);
      background-color: var(--color-background);
      /* This makes background change smoothly */
      transition: background-color 0.25s;
    }
    body {
      font-size: var(--font-size-base);
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      line-height: 1.7;
    }
    a {
      text-decoration: none;
      color: var(--color-blue);
    }
    a:hover {
      color: var(--color-opacityBlue);
      text-decoration: underline;
    }

    // nprogress bar
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: var(--color-blue);
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
    }
`;
