import type { IntlConfig } from 'react-intl';

import HttpClient from '@/adapters/HttpClient';

export type Translations = IntlConfig['messages'];

class TranslationApi {
  baseURL: string;
  httpClient: HttpClient;

  constructor() {
    this.baseURL = 'https://cdn.simplelocalize.io/';
    this.httpClient = new HttpClient();
  }
  getTranslationsByLanguageKey = async (locale: string) => {
    const response = this.httpClient.request<Translations>(
      `${this.baseURL}${process.env.NEXT_PUBLIC_SIMPLELOCALIZE_PROJECT_TOKEN}/_latest/${locale}`
    );
    return response;
  };
}

export default new TranslationApi();
