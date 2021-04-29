import { FC } from 'react';
import { GetStaticProps } from 'next';

type Props = {
  framework: string;
};

const SSG: FC<Props> = ({ framework }) => {
  return <div>{framework} ssg example</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { framework: 'preact' },
  };
};

export default SSG;
