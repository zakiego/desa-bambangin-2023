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
});
