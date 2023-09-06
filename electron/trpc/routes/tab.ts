import { router, publicProcedure, ee } from "../trpc.ts";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { TabDataSchema, TabData } from "../../lib/tabs.ts";

export const tabRouter = router({
  getTab: publicProcedure
    .input(z.number())
    .output(TabDataSchema.optional())
    .query(({ ctx, input }) => {
      const tab = ctx.tabs.getTab(input);
      if (!tab) return undefined;
      return tab.getTabData();
    }),
  getActiveTabId: publicProcedure
    .output(z.number())
    .query(({ ctx }) => ctx.tabs.getActiveTabId()),
  getTabIds: publicProcedure
    .output(z.array(z.number()))
    .query(({ ctx }) => ctx.tabs.getTabIds()),

  createTab: publicProcedure
    .input(z.string().optional())
    .output(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.createTab(input)),
  setActiveTab: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.setActiveTab(input)),
  closeTab: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.closeTab(input)),

  forward: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.forward(input)),
  back: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.back(input)),
  reload: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.reload(input)),
  stop: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.stop(input)),
  setUrl: publicProcedure
    .input(
      z.object({
        id: z.number(),
        url: z.string(),
      }),
    )
    .mutation(({ ctx, input: { id, url } }) => ctx.tabs.setUrl(id, url)),

  addFavorite: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.addFavorite(input)),
  removeFavorite: publicProcedure
    .input(z.number())
    .mutation(({ ctx, input }) => ctx.tabs.removeFavorite(input)),

  onTabListChanged: publicProcedure.subscription(() => {
    return observable<number[]>((emit) => {
      const onTabListChanged = (tabIds: number[]) => emit.next(tabIds);

      ee.on("tabListChanged", onTabListChanged);

      return () => {
        ee.off("tabListChanged", onTabListChanged);
      };
    });
  }),
  onTabSwitched: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const onTabSwitched = (id: number) => emit.next(id);

      ee.on("tabSwitched", onTabSwitched);

      return () => {
        ee.off("tabSwitched", onTabSwitched);
      };
    });
  }),
  onTabDataChanged: publicProcedure.subscription(() => {
    return observable<{ id: number; data: TabData }>((emit) => {
      const onTabDataChanged = (id: number, data: TabData) =>
        emit.next({ id, data });

      ee.on("tabDataChanged", onTabDataChanged);

      return () => {
        ee.off("tabDataChanged", onTabDataChanged);
      };
    });
  }),
});
