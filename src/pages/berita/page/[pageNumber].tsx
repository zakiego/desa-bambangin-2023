import { type GetStaticProps, type InferGetStaticPropsType } from "next";

import { ListNews } from "~/src/components/Berita";
import { BreadCrumb, Footer, Navbar, Pagination } from "~/src/components/UI";
import { trpSSR } from "~/src/server/api/root";

const LIMIT = 4;

export const getStaticPaths = async () => {
  const { paging } = await trpSSR.collection.beritaPagination({
    limit: LIMIT,
    page: 1,
  });

  const listSlug = Array.from({ length: paging.totalPage }, (_, i) => i + 1);

  return {
    paths: listSlug.map((slug) => ({
      params: {
        pageNumber: slug.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { pageNumber } = context.params as { pageNumber: string };

  const berita = await trpSSR.collection.beritaPagination({
    limit: LIMIT,
    page: parseInt(pageNumber),
  });

  return {
    props: {
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
            breadcrumb={[
              {
                title: "Beranda",
                href: "/",
              },
              {
                title: "Berita",
                href: "/berita/page",
              },
            ]}
          />

          <ListNews data={props.berita.data} />

          <div className="pt-6">
            <Pagination
              totalPage={props.berita.paging.totalPage}
              currentPage={props.berita.paging.currentPage}
              limit={props.berita.paging.limit}
              hasPrevious={props.berita.paging.hasPrevious}
              hasNext={props.berita.paging.hasNext}
              totalData={props.berita.paging.totalData}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Page;
