/// <reference types="vite/client" />

import type { IpcRendererEvent } from "electron";
import type { TabData } from "../electron/lib/tabs.ts";

export interface AppWindowApi {
  close: () => Promise<void>;
  minimize: () => Promise<void>;
  toggleMaximize: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onToggleMaximize: (
    callback: (e: IpcRendererEvent, isMaximized: boolean) => void,
  ) => () => void;
}

export interface TabsApi {
  getTab: (id: number) => Promise<TabData>;
  getActiveTabId: () => Promise<number>;
  getTabIds: () => Promise<number[]>;

  createTab: () => Promise<number>;
  setActiveTab: (id: number) => Promise<void>;
  closeTab: (id: number) => Promise<void>;

  forward: (id: number) => Promise<void>;
  back: (id: number) => Promise<void>;
  reload: (id: number) => Promise<void>;
  stop: (id: number) => Promise<void>;
  setUrl: (id: number, url: string) => Promise<void>;

  onTabListChanged: (
    callback: (e: IpcRendererEvent, tabIds: number[]) => void,
  ) => () => void;
  onTabSwitched: (
    callback: (e: IpcRendererEvent, id: number) => void,
  ) => () => void;
  onTabDataChanged: (
    callback: (e: IpcRendererEvent, id: number, data: TabData) => void,
  ) => () => void;
}

declare global {
  interface Window {
    appWindow: AppWindowApi;
    tabs: TabsApi;
  }
}
