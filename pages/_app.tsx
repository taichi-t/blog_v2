import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import { DEFALUTL_LOCALE } from '@/constants/locales';
import DEFAULT_MESSAGES from '@/lang/en-US.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
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
  );
};

export default App;
