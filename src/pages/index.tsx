import { type InferGetStaticPropsType } from "next";

import { Hero, News, Profile } from "~/src/components/Homepage";
import { ContainerContent } from "~/src/components/Layout";
import { Footer, Navbar } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

export const getStaticProps = async () => {
  const homepage = await trpSSR.singleton.homepage();
  const profile = await trpSSR.singleton.profile();
  const hightlights = await trpSSR.singleton.highlights();

  return {
    props: {
      homepage,
      profile,
      hightlights,
    },
  };
};

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Navbar />
      <ContainerContent title="Home | Desa Bambangin 2023">
        <Hero title={props.homepage.title} subtitle={props.homepage.subtitle} />
        <News data={props.hightlights} />
        <Profile title={props.profile.title} content={props.profile.content} />
      </ContainerContent>
      <Footer />
    </main>
  );
};

export default Page;
