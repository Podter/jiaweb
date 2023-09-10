/// <reference types="vite/client" />

import type { TabData } from "../electron/lib/tabs.ts";

export interface TabsApi {
  getTab: (id: number) => Promise<TabData>;
  getActiveTabId: () => Promise<number>;
  getTabIds: () => Promise<number[]>;
}

declare global {
  interface Window {
    tabs: TabsApi;
  }
}
