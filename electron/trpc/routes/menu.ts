import { router, publicProcedure } from "../trpc.ts";
import { createMoreMenu } from "../../menu/moreMenu.ts";
import { createFavoritesMenu } from "../../menu/favoriteMenu.ts";

export const menuRouter = router({
  moreMenu: publicProcedure.mutation(({ ctx }) => {
    createMoreMenu(ctx.tabs, ctx.store).popup({ window: ctx.win });
  }),
  favoritesMenu: publicProcedure.mutation(({ ctx }) => {
    createFavoritesMenu(ctx.tabs, ctx.store).popup({ window: ctx.win });
  }),
});
