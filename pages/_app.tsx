import { IntlProvider } from 'react-intl';
import { AppProps } from 'next/app';
import { DEFALUTL_LOCALE, FALLBACK_LOCALE } from '@/constants/locale';
import useTranslations from '@/hooks/useTranslations';
import FALLBACK_MESSAGES from '@/lang/en-US.json';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { translations, locale } = useTranslations();

  return (
    <IntlProvider
      messages={translations ?? FALLBACK_MESSAGES}
      locale={locale ?? FALLBACK_LOCALE}
      defaultLocale={DEFALUTL_LOCALE}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
