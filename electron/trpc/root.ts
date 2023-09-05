import { router } from "./trpc.ts";

import { menuRouter } from "./routes/menu.ts";

export const appRouter = router({
  menu: menuRouter,
});

export type AppRouter = typeof appRouter;
