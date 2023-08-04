/// <reference types="vite/client" />

import type { IpcRendererEvent } from "electron";

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
  onTabDestroyed: (
    callback: (e: IpcRendererEvent, tabId: number) => void,
  ) => () => void;
  onTabCreated: (
    callback: (e: IpcRendererEvent, tabId: number) => void,
  ) => () => void;
  onTabChanged: (
    callback: (e: IpcRendererEvent, tabId: number) => void,
  ) => () => void;

  getActiveTab: () => Promise<number>;
  getTab: (id: number) => Promise<number>;
  getTabIds: () => Promise<number[]>;

  createTab: () => Promise<number>;
  setActiveTab: (id: number) => Promise<void>;
  closeTab: (id: number) => Promise<void>;

  forward: () => Promise<void>;
  back: () => Promise<void>;
  reload: () => Promise<void>;
}

declare global {
  interface Window {
    appWindow: AppWindowApi;
    tabs: TabsApi;
  }
}
