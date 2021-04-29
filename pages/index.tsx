import Link from 'next/link';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

const Home: FC = () => {
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
