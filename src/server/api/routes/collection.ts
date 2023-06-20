import { z } from "zod";

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

  // highlights: publicProcedure.query(async () => {
  //   const highlights = await keystaticReader.collections.highlights.read();

  //   const schema = z.array(
  //     z.object({
  //       title: z.string(),
  //       content: z.any(),
  //     }),
  //   );

  //   const render = await highlights?.content();

  //   const data = schema.parse(render);

  //   return data;
  // }),
});
