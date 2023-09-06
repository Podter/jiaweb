import { router, publicProcedure } from "../trpc.ts";
import { observable } from "@trpc/server/observable";

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
  onToggleMaximize: publicProcedure.subscription(({ ctx }) => {
    return observable<boolean>((emit) => {
      const onMaximize = () => emit.next(true);
      const onUnmaximize = () => emit.next(false);

      ctx.win.on("maximize", onMaximize);
      ctx.win.on("unmaximize", onUnmaximize);

      return () => {
        ctx.win.off("maximize", onMaximize);
        ctx.win.off("unmaximize", onUnmaximize);
      };
    });
  }),
});
