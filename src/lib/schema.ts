import { z } from "zod";

export const keystaticSchema = {
  singletons: {
    berita: z.object({
      title: z.string(),
      image: z.string(),
      datePublished: z.string(),
      summary: z.string(),
      content: z.any(),
      id: z.string(),
      slug: z.string(),
    }),
  },
  collections: {},
};
