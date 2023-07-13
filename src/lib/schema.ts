import { z } from "zod";

export const keystaticSchema = {
  kkn: {
    team: z.object({
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
    teamCollection: z.object({
      name: z.string(),
      role: z.string(),
      image: z.string(),
      instagram: z.string().nullish(),
      twitter: z.string().nullish(),
      linkedin: z.string().nullish(),
      bio: z.string(),
    }),
    page: z.object({
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
      blog: z.object({
        heading: z.string(),
        subheading: z.string(),
      }),
      team: z.object({
        heading: z.string(),
        subheading: z.string(),
      }),
      teamPeople: z.array(
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
    article: z.object({
      title: z.string(),
      image: z.string(),
      datePublished: z.string(),
      summary: z.string(),
      content: z.any(),
      id: z.string(),
      slug: z.string(),
      author: z.object({
        name: z.string(),
        image: z.string(),
      }),
    }),
  },

  pages: z.object({
    title: z.string(),
    image: z.string(),
    datePublished: z.string(),
    summary: z.string(),
    content: z.any(),
    id: z.string(),
    slug: z.string(),
  }),

  berita: z.object({
    title: z.string(),
    image: z.string(),
    datePublished: z.string(),
    summary: z.string(),
    content: z.any(),
    id: z.string(),
    slug: z.string(),
  }),
};
