import { type GetServerSidePropsContext } from "next";

import { SimpleLayout } from "~/src/components/Layout";
import { Footer, Navbar } from "~/src/components/UI";
import { trpcSSR, type TRPCTypeOutput } from "~/src/server/api/root";

export const getStaticPaths = async () => {
  const listSlug = await trpcSSR.keystatic.kkn.articles.getAllSlug();

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

  const berita = await trpcSSR.keystatic.kkn.articles.getDetail({
    slug,
  });

  return {
    props: {
      slug,
      berita,
    },
  };
};

type Props = {
  slug: string;
  berita: TRPCTypeOutput["keystatic"]["kkn"]["articles"]["getDetail"];
};

const Page = (props: Props) => {
  return (
    <main>
      <Navbar />
      <SimpleLayout
        meta={{
          title: `${props.berita.title} | Cerita KKN Sosiologi Kelompok 9`,
          description: props.berita.summary,
          image: props.berita.image,
        }}
        article={{
          title: props.berita.title,
          image: props.berita.image,
          date: props.berita.datePublished,
          content: props.berita.content,
          author: {
            name: props.berita.author.name,
            image: props.berita.author.image,
          },
        }}
        breadcrumb={[
          {
            title: "Beranda",
            href: "/",
          },
          {
            title: "KKN",
            href: "/kkn",
          },
          {
            title: props.berita.title,
            href: `/kkn/cerita/${props.slug}`,
          },
        ]}
      />
      <Footer />
    </main>
  );
};

export default Page;
