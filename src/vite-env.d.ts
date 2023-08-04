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

declare global {
  interface Window {
    appWindow: AppWindowApi;
  }
}
