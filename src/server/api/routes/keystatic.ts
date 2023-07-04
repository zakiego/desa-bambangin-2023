import { z } from "zod";

import { keystaticSchema } from "~/src/lib/schema";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import { keystaticReader } from "~/src/utils/reader";

export const keystaticRouter = createTRPCRouter({
  kknTeam: publicProcedure.query(async () => {
    const data = await keystaticReader.singletons.kknTeam.readOrThrow();

    const parsed = keystaticSchema.kknTeam.parse(data);

    return parsed;
  }),

  kknPage: publicProcedure.query(async () => {
    const data = await keystaticReader.singletons.kknPage.readOrThrow();

    const render = {
      ...data,
      mission: {
        ...data.mission,
        content: await data.mission.content(),
      },
    };

    const parsed = keystaticSchema.kknPage.parse(render);

    return parsed;
  }),

  pages: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { slug } = input;

      const data = await keystaticReader.collections.pages.readOrThrow(slug);

      const parsed = keystaticSchema.pages.parse({
        ...data,
        slug,
        content: await data.content(),
      });

      return parsed;
    }),

  berita: createTRPCRouter({
    pagination: publicProcedure
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

        const data = keystaticSchema.collections.beritaPagination.parse(waited);

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
  }),
});
