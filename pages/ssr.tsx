import { FC } from "react";
import { GetServerSideProps } from "next";

type Props = {
  framework: string;
};

const SSR: FC<Props> = ({ framework }) => {
  return <div>{framework} ssr example</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { framework: "preact" },
  };
};

export default SSR;
