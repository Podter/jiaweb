import { initTRPC } from "@trpc/server";
import { EventEmitter } from "events";
import type { BrowserWindow } from "electron";
import type { Tabs } from "../lib/tabs.ts";
import type { StoreType } from "../main.ts";

export function createTRPCContext(
  win: BrowserWindow,
  tabs: Tabs,
  store: StoreType,
) {
  return {
    win,
    tabs,
    store,
  };
}

export const ee = new EventEmitter();

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
