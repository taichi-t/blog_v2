import { useRouter } from 'next/router';
import { WEBSITE } from '@/constants/website';

const useUrl = (): string => {
  const { asPath, locale } = useRouter();
  //TODO: test
  const url = `${WEBSITE.PROTOCOL}://${WEBSITE.HOSTNAME}/${locale}${asPath}`;
  return url;
};

export default useUrl;
