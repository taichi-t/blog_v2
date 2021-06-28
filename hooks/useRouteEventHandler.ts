import Router from 'next/router';
import NProgress from 'nprogress';
import gtag from '@/helpers/gtag';
import * as React from 'react';

const useRouteEventHandler = (): void => {
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done();
      gtag.pageview(url);
    });
    Router.events.on('routeChangeError', () => NProgress.done());
    return () => {
      Router.events.off('routeChangeStart', () => {
        NProgress.start();
      });
      Router.events.off('routeChangeComplete', (url) => {
        NProgress.done();
        gtag.pageview(url);
      });
      Router.events.off('routeChangeError', () => {
        NProgress.done();
      });
    };
  }, []);
};

export default useRouteEventHandler;
