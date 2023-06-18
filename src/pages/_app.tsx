import "~/src/styles/globals.css";

import { type AppType } from "next/dist/shared/lib/utils";

import { trpc } from "~/src/utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
