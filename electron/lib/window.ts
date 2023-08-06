import {
  ipcMain,
  type BrowserWindow,
  ipcRenderer,
  IpcRendererEvent,
  nativeTheme,
} from "electron";
import type { StoreType } from "../main.ts";

export function initWindowApi(win: BrowserWindow, store: StoreType) {
  ipcMain.handle("close", () => win.close());
  ipcMain.handle("minimize", () => win.minimize());
  ipcMain.handle("toggleMaximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.handle("isMaximized", () => win.isMaximized());

  ipcMain.handle("toggleTheme", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
      store.set("theme", "light");
    } else {
      nativeTheme.themeSource = "dark";
      store.set("theme", "dark");
    }
    return nativeTheme.shouldUseDarkColors;
  });

  win.on("maximize", () => win.webContents.send("onToggleMaximize", true));
  win.on("unmaximize", () => win.webContents.send("onToggleMaximize", false));
}

export const windowApi = {
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),

  isMaximized: () => ipcRenderer.invoke("isMaximized"),

  toggleTheme: () => ipcRenderer.invoke("toggleTheme"),

  onToggleMaximize: (
    callback: (e: IpcRendererEvent, isMaximized: boolean) => void,
  ) => {
    ipcRenderer.on("onToggleMaximize", callback);
    return () => ipcRenderer.off("onToggleMaximize", callback);
  },
};
