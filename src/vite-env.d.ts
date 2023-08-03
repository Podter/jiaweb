/// <reference types="vite/client" />

export interface AppWindowApi {
  close: () => Promise<void>;
  minimize: () => Promise<void>;
  toggleMaximize: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onResized: (callback: () => void) => () => void;
}

declare global {
  interface Window {
    appWindow: AppWindowApi;
  }
}
