import { z } from "zod";

import { keystaticSchema } from "~/src/lib/schema";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import { keystaticReader } from "~/src/utils/reader";

export const singletonsRouter = createTRPCRouter({
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

  highlights: publicProcedure.query(async () => {
    const hightlights = await keystaticReader.singletons.hightlights.read();

    const schema = z.object({
      content: z.array(z.string()),
    });

    const listHighlights = schema.parse(hightlights);

    const getAllBerita = listHighlights.content.map(async (slug) => {
      const beritaData = await keystaticReader.collections.berita.read(slug);

      const render = {
        ...beritaData,
        content: await beritaData?.content(),
        slug,
      };

      const data = keystaticSchema.collections.beritaWithSlug.parse(render);

      return data;
    });

    const data = await Promise.all(getAllBerita);

    return data;
  }),
});
