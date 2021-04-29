import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import en from '../compiled-lang/en.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
