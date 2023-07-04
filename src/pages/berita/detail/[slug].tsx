import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";

import { SimpleLayout } from "~/src/components/Layout/SimpleLayout";
import { Footer, Navbar } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

export const getStaticPaths = async () => {
  const listSlug = await trpSSR.collection.beritaAllSlug();

  return {
    paths: listSlug.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const { slug } = context.params as { slug: string };

  const berita = await trpSSR.collection.beritaBySlug({ slug });

  return {
    props: {
      slug,
      berita,
    },
  };
};

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Navbar />
      <SimpleLayout
        title={`${props.berita.title} | Berita`}
        breadcrumb={[
          {
            title: "Beranda",
            href: "/",
          },
          {
            title: "Berita",
            href: "/berita/page",
          },
          {
            title: props.berita.title,
            href: `/berita/detail/${props.slug}`,
          },
        ]}
        image={props.berita.image}
        date={props.berita.datePublished}
        content={props.berita.content}
      />
      <Footer />
    </main>
  );
};

export default Page;
