import { DocumentRenderer } from "@keystatic/core/renderer";
import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import Image from "next/image";

import { BreadCrumb, Footer, Navbar } from "~/src/components/UI";
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

export const getStaticProps: GetStaticProps = async (context) => {
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

      <div className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <BreadCrumb
            title={props.berita.title}
            slug={props.slug}
            back="/berita"
            breadcrumb={[
              {
                title: "Beranda",
                href: "/",
              },
              {
                title: "Berita",
                href: "/berita",
              },
              {
                title: props.berita.title,
                href: `/berita/${props.slug}`,
              },
            ]}
          />

          <div className="pt-4 pb-4">
            <Image
              src={props.berita.image}
              alt={props.berita.title}
              width={1200}
              height={630}
              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[2/1]"
            />
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {props.berita.title}
          </h1>
          <div className="prose pt-6">
            <DocumentRenderer document={props.berita.content} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Page;
