import { type inferRouterOutputs } from "@trpc/server";

import { exampleRouter } from "~/src/server/api/routes/example";
import { keystaticRouter } from "~/src/server/api/routes/keystatic";
import { createTRPCRouter } from "~/src/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  keystatic: keystaticRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const trpcSSR = appRouter.createCaller({});

export type OutputTypeTRPC = inferRouterOutputs<AppRouter>;
