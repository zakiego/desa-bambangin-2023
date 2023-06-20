import { type GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "/berita/page/1",
      permanent: false,
    },
  };
};

const Page = () => {
  return <></>;
};

export default Page;
