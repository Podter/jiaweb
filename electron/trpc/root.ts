import { router } from "./trpc.ts";

import { testRouter } from "./routes/test.ts";

export const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
