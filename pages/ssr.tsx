import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { FormattedMessage } from 'react-intl';

type Props = {
  framework: string;
};

const SSR: FC<Props> = ({ framework }) => {
  return (
    <div>
      {framework} <FormattedMessage defaultMessage="ssr example" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { framework: 'preact' },
  };
};

export default SSR;
