/// <reference types="vite/client" />

import type { TabData } from "../electron/lib/tabs.ts";

export interface TabsApi {
  getTab: (id: number) => Promise<TabData>;
  getActiveTabId: () => Promise<number>;
  getTabIds: () => Promise<number[]>;

  createTab: (initialUrl?: string) => Promise<number>;
  setActiveTab: (id: number) => Promise<void>;
  closeTab: (id: number) => Promise<void>;
}

declare global {
  interface Window {
    tabs: TabsApi;
  }
}
