import { initTRPC } from "@trpc/server";
// import { testRouter } from "./routes/test.ts";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  test: router({
    hello: publicProcedure
      .input(z.string())
      .output(z.string())
      .query(({ input }) => `Hello, ${input}!`),
  }),
});

export type AppRouter = typeof appRouter;
