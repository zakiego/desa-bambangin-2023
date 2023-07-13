import { makeAPIRouteHandler } from "@keystatic/next/api";

import keystaticConfig from "~/keystatic.config";

export const config =
  process.env.NODE_ENV === "development"
    ? {
        api: {
          bodyParser: {
            sizeLimit: "20mb",
          },
          responseLimit: "20mb",
        },
      }
    : {};

export default makeAPIRouteHandler({ config: keystaticConfig });
