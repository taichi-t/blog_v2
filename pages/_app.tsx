import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import en from '../compiled-lang/en.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const message = en;
  return (
    <IntlProvider messages={message} locale="en" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
