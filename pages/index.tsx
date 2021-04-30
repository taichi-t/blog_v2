import Link from 'next/link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import CMSApi from '@/services/CMSApi';

const Home: React.VFC = () => {
  React.useEffect(() => {
    const getProfile = async () => {
      await new CMSApi().getMyProfile();
    };
    getProfile();
  }, []);

  return (
    <div>
      <FormattedMessage defaultMessage="hello" />
      <ul>
        <li>
          <Link href="/about">
            <FormattedMessage defaultMessage="about" />
          </Link>
        </li>
        <li>
          <Link href="/ssr">
            <a>
              <FormattedMessage defaultMessage="SSR" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/ssg">
            <a>
              <FormattedMessage defaultMessage="SSG" />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
