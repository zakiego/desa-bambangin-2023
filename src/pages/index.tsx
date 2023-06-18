import { type InferGetStaticPropsType, type InferGetServerSidePropsType } from "next";
import { type FC } from "react";

import { Hero } from "~/src/components/Homepage";
import { trpSSR } from "~/src/server/api/root";

export const getStaticProps = async () => {
  const data = await trpSSR.keystatic.homepage();

  return {
    props: data,
  };
};

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Hero title="Desa" subtitle="Hai" />
    </main>
  );
};

export default Page;
