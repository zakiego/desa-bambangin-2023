import {
  type GetServerSidePropsContext,
  type InferGetStaticPropsType,
} from "next";

import { SimpleLayout } from "~/src/components/Layout";
import { Footer, Navbar } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

export const getStaticPaths = async () => {
  const listSlug = await trpSSR.keystatic.berita.getAllSlug();

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

  const berita = await trpSSR.keystatic.berita.getDetail({
    slug,
  });

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
        meta={{
          title: `${props.berita.title} | Berita`,
        }}
        article={{
          title: props.berita.title,
          image: props.berita.image,
          date: props.berita.datePublished,
          content: props.berita.content,
        }}
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
      />
      <Footer />
    </main>
  );
};

export default Page;
