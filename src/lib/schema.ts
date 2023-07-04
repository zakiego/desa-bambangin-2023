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
  kknTeam: z.object({
    heading: z.string(),
    subheading: z.string(),
    people: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        image: z.string(),
        instagram: z.string().nullish(),
        twitter: z.string().nullish(),
        linkedin: z.string().nullish(),
        bio: z.string(),
      }),
    ),
  }),
  kknPage: z.object({
    hero: z.object({
      heading: z.string(),
      subheading: z.string(),
      images: z.array(z.string()),
    }),
    mission: z.object({
      heading: z.string(),
      subheading: z.string(),
      content: z.any(),
    }),
    values: z.object({
      image: z.string(),
      heading: z.string(),
      subheading: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
    stats: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
  pages: z.object({
    title: z.string(),
    image: z.string(),
    datePublished: z.string(),
    summary: z.string(),
    content: z.any(),
    id: z.string(),
    slug: z.string(),
  }),
};
