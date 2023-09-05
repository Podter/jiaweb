import { router, publicProcedure } from "../trpc.ts";
import { z } from "zod";

export const newTabRouter = router({
  search: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const activeTab = ctx.tabs.getActiveTabId();
    ctx.tabs.setUrl(activeTab, "https://duckduckgo.com/?q=" + input);
  }),
});
