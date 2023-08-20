import { z } from "zod";

import { keystaticSchema } from "~/src/lib/schema";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import { parseDateKeystatic } from "~/src/utils/date";
import { keystaticReader } from "~/src/utils/reader";

export const keystaticRouter = createTRPCRouter({
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

      const data = keystaticSchema.berita.parse(render);

      return data;
    });

    const data = await Promise.all(getAllBerita);

    return data;
  }),

  kkn: createTRPCRouter({
    page: publicProcedure.query(async () => {
      const data = await keystaticReader.singletons.kknPage.readOrThrow();

      const teamPeople = data.teamPeople.map(async (item) => {
        if (item === null) {
          return null;
        }
        const data = await keystaticReader.collections.kknTeam.read(item);

        const parsed = keystaticSchema.kkn.teamCollection.parse(data);

        return parsed;
      });

      const render = {
        ...data,
        mission: {
          ...data.mission,
          content: await data.mission.content(),
        },
        teamPeople: await Promise.all(teamPeople),
      };

      const parsed = keystaticSchema.kkn.page.parse(render);

      return parsed;
    }),

    articles: createTRPCRouter({
      getAllSlug: publicProcedure.query(async () => {
        const list = await keystaticReader.collections.kknArticles.list();

        const schema = z.array(z.string());

        const data = schema.parse(list);

        return data;
      }),

      getDetail: publicProcedure
        .input(
          z.object({
            slug: z.string(),
          }),
        )
        .query(async ({ input }) => {
          const { slug } = input;

          const raw = await keystaticReader.collections.kknArticles.read(slug);

          const author = await keystaticReader.collections.kknTeam.read(
            raw?.author as string,
          );

          const render = {
            ...raw,
            content: await raw?.content(),
            slug,
            author,
          };

          const data = keystaticSchema.kkn.article.parse(render);

          return data;
        }),

      pagination: publicProcedure
        .input(
          z.object({
            page: z.number(),
            limit: z.number(),
            sort: z.enum(["asc", "desc"]).default("desc"),
          }),
        )
        .query(async ({ input }) => {
          const { page, limit, sort } = input;

          const raw = await keystaticReader.collections.kknArticles.all();

          const render = raw.map(async (item) => {
            const author = await keystaticReader.collections.kknTeam.read(
              item.entry.author as string,
            );

            return {
              ...item.entry,
              content: await item.entry.content(),
              slug: item.slug,
              author,
            };
          });

          const waited = await Promise.all(render);

          const data = z.array(keystaticSchema.kkn.article).parse(waited);

          const sorted = data.sort((a, b) => {
            const dateA = parseDateKeystatic(a.datePublished);
            const dateB = parseDateKeystatic(b.datePublished);

            if (sort === "asc") {
              return dateA.getTime() - dateB.getTime();
            } else {
              return dateB.getTime() - dateA.getTime();
            }
          });

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
            data: sorted.slice((page - 1) * limit, page * limit),
          };
        }),
    }),

    awards: publicProcedure.query(async () => {
      const raw = await keystaticReader.singletons.kknAward.read();

      const people = await keystaticReader.collections.kknTeam.all();

      const render = {
        ...raw,
        awards: raw?.awards.map((item) => {
          const peopleData = people.find(
            (people) => people.slug === item.people,
          );

          return {
            ...item,
            people: peopleData?.entry,
          };
        }),
      };

      const parsed = keystaticSchema.kkn.awards.parse(render);

      return parsed;
    }),
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
            ...item.entry,
            content: await item.entry.content(),
            slug: item.slug,
          };
        });

        const waited = await Promise.all(render);

        const data = z.array(keystaticSchema.berita).parse(waited);

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

    getAllSlug: publicProcedure.query(async () => {
      const list = await keystaticReader.collections.berita.list();

      const schema = z.array(z.string());

      const data = schema.parse(list);

      return data;
    }),

    getDetail: publicProcedure
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
          slug,
        };

        const data = keystaticSchema.berita.parse(render);

        return data;
      }),
  }),
});
