import { z } from "zod";

import { keystaticSchema } from "~/src/lib/schema";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import { keystaticReader } from "~/src/utils/reader";

export const collectionRouter = createTRPCRouter({
  homepage: publicProcedure.query(async () => {
    const homepage = await keystaticReader.singletons.homepage.read();

    const schema = z.object({
      title: z.string(),
      subtitle: z.string(),
    });

    const render = homepage;

    const data = schema.parse(render);

    return data;
  }),

  profile: publicProcedure.query(async () => {
    const profile = await keystaticReader.singletons.profile.read();

    const schema = z.object({
      title: z.string(),
      content: z.any(),
    });

    const render = {
      ...profile,
      content: await profile?.content(),
    };

    const data = schema.parse(render);

    return data;
  }),

  beritaAllSlug: publicProcedure.query(async () => {
    const list = await keystaticReader.collections.berita.list();

    const schema = z.array(z.string());

    const data = schema.parse(list);

    return data;
  }),

  beritaBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { slug } = input;

      const raw = await keystaticReader.collections.berita.read(slug);

      const render = {
        ...raw,
        content: await raw?.content(),
      };

      const data = keystaticSchema.collections.berita.parse(render);

      return data;
    }),

  beritaPagination: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { page, limit } = input;

      const raw = await keystaticReader.collections.berita.all();

      const render = raw.map(async (item) => {
        return {
          ...item,
          entry: {
            ...item.entry,
            content: await item.entry.content(),
          },
        };
      });

      const waited = await Promise.all(render);

      // const data = keystaticSchema.collections.beritaPagination.parse(waited);
      const data = [...waited, ...waited, ...waited, ...waited, ...waited];

      const paging = {
        hasNext: page < Math.ceil(data.length / limit),
        hasPrevious: page > 1,
        totalData: data.length,
        totalPage: Math.ceil(data.length / limit),
        currentPage: page,
        limit,
      };

      return {
        paging: paging,
        data: data.slice((page - 1) * limit, page * limit),
      };
    }),
});
