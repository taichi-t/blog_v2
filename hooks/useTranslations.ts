import * as React from 'react';

import { DEFALUTL_LOCALE } from '@/constants/locales';
import translationApi, { Translations } from '@/services/TranslationApi';

type Props = {
  translations: Translations;
  isLoading: boolean;
};

const useTranslations = (locale: string): Props => {
  const [translations, setTranslations] = React.useState<Translations>();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const response = await translationApi.getTranslationsByLanguageKey(
        locale ?? DEFALUTL_LOCALE
      );
      setTranslations(response);
      setLoading(false);
    };
    fetcher();
  }, [locale]);

  return { translations, isLoading };
};

export default useTranslations;
