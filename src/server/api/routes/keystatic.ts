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
});
