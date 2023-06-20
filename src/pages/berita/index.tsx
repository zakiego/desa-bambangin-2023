import { type GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/berita/page/1",
      permanent: true,
    },
  };
};

const Page = () => {
  return <></>;
};

export default Page;
