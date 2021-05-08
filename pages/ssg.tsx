import { FC } from 'react';
import { GetStaticProps } from 'next';
import { FormattedMessage } from 'react-intl';
import { styled } from '@linaria/react';

type Props = {
  framework: string;
};

const SSG: FC<Props> = ({ framework }) => {
  return (
    <div>
      {framework}
      <FormattedMessage defaultMessage="ssr example" />
      <Text>青色のテキストです</Text>
    </div>
  );
};
const Text = styled('p')`
  color: blue;
`;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { framework: 'preact' },
  };
};

export default SSG;
