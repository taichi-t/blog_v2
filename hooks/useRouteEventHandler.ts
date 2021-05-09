import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';

const useRouteEventHandler = (): void => {
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
};

export default useRouteEventHandler;
