import { z } from "zod";

export const keystaticSchema = {
  singletons: {},
  collections: {
    berita: z.object({
      title: z.string(),
      image: z.string(),
      datePublished: z.string(),
      summary: z.string(),
      content: z.any(),
      id: z.string(),
    }),
    beritaWithSlug: z.object({
      title: z.string(),
      image: z.string(),
      datePublished: z.string(),
      summary: z.string(),
      content: z.any(),
      id: z.string(),
      slug: z.string(),
    }),
    beritaPagination: z.array(
      z.object({
        slug: z.string(),
        entry: z.object({
          title: z.string(),
          image: z.string(),
          datePublished: z.string(),
          summary: z.string(),
          content: z.any(),
          id: z.string(),
        }),
      }),
    ),
  },
};
