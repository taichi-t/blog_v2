import { FC } from 'react';
import { GetStaticProps } from 'next';
import { FormattedMessage } from 'react-intl';

type Props = {
  framework: string;
};

const SSG: FC<Props> = ({ framework }) => {
  return (
    <div>
      {framework}
      <FormattedMessage defaultMessage="ssr example" />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { framework: 'preact' },
  };
};

export default SSG;
