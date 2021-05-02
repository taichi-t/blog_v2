import { useRouter } from 'next/router';
import * as React from 'react';
import translationApi, { Translations } from '@/services/TranslationApi';
import { FALLBACK_LOCALE } from '@/constants/locale';

type Props = {
  translations: Translations;
  isLoading: boolean;
  locale: string | undefined;
};

const useTranslations = (): Props => {
  const { locale } = useRouter();
  const [translations, setTranslations] = React.useState<Translations>();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const response = await translationApi.getTranslationsByLanguageKey(
        locale ?? FALLBACK_LOCALE
      );
      setTranslations(response);
      setLoading(false);
    };
    fetcher();
  }, [locale]);

  return { translations, isLoading, locale };
};

export default useTranslations;
