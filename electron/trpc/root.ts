import { router } from "./trpc.ts";

import { menuRouter } from "./routes/menu.ts";
import { newTabRouter } from "./routes/newTab.ts";

export const appRouter = router({
  menu: menuRouter,
  newTab: newTabRouter,
});

export type AppRouter = typeof appRouter;
