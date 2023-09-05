import { router, publicProcedure } from "../trpc.ts";
import { z } from "zod";

export const testRouter = router({
  hello: publicProcedure
    .input(z.string())
    .output(z.string())
    .query(({ input }) => `Hello, ${input}!`),
});
