import { type InferGetStaticPropsType } from "next";

import { Hero, News, Profile } from "~/src/components/Homepage";
import { Footer } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

export const getStaticProps = async () => {
  const homepage = await trpSSR.keystatic.homepage();
  const profile = await trpSSR.keystatic.profile();

  return {
    props: {
      homepage,
      profile,
    },
  };
};

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Hero title={props.homepage.title} subtitle={props.homepage.subtitle} />
      <News />
      <Profile title={props.profile.title} content={props.profile.content} />
      <Footer />
    </main>
  );
};

export default Page;
