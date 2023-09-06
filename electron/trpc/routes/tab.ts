import { router, publicProcedure, ee } from "../trpc.ts";
import { observable } from "@trpc/server/observable";
import type { TabData } from "../../lib/tabs.ts";

export const tabRouter = router({
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
