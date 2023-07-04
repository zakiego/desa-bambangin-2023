import { type InferGetStaticPropsType } from "next";

import { Hero, News, Profile } from "~/src/components/Homepage";
import { ContainerContent } from "~/src/components/Layout";
import { Footer, Navbar } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

export const getStaticProps = async () => {
  const homepage = await trpSSR.keystatic.homepage();
  const hightlights = await trpSSR.keystatic.highlights();
  const profil = await trpSSR.keystatic.pages({
    slug: "profil-desa",
  });

  return {
    props: {
      homepage,

      hightlights,
      profil,
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
        <Profile title={props.profil.title} content={props.profil.content} />
      </ContainerContent>
      <Footer />
    </main>
  );
};

export default Page;
