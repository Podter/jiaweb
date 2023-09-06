import { router } from "./trpc.ts";

import { menuRouter } from "./routes/menu.ts";
import { newTabRouter } from "./routes/newTab.ts";
import { windowRouter } from "./routes/window.ts";

export const appRouter = router({
  menu: menuRouter,
  newTab: newTabRouter,
  window: windowRouter,
});

export type AppRouter = typeof appRouter;
