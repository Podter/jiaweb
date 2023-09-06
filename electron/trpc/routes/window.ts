import { router, publicProcedure } from "../trpc.ts";
import { z } from "zod";

export const windowRouter = router({
  close: publicProcedure.mutation(({ ctx }) => {
    ctx.win.close();
  }),
  minimize: publicProcedure.mutation(({ ctx }) => {
    ctx.win.minimize();
  }),
  toggleMaximize: publicProcedure.mutation(({ ctx }) => {
    if (ctx.win.isMaximized()) {
      ctx.win.unmaximize();
    } else {
      ctx.win.maximize();
    }
  }),
  isMaximized: publicProcedure.output(z.boolean()).query(({ ctx }) => {
    return ctx.win.isMaximized();
  }),
});
