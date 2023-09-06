import {
  ipcMain,
  type BrowserWindow,
  ipcRenderer,
  IpcRendererEvent,
} from "electron";

export function initWindowApi(win: BrowserWindow) {
  ipcMain.handle("isMaximized", () => win.isMaximized());

  win.on("maximize", () => win.webContents.send("onToggleMaximize", true));
  win.on("unmaximize", () => win.webContents.send("onToggleMaximize", false));
}

export const windowApi = {
  isMaximized: () => ipcRenderer.invoke("isMaximized"),

  onToggleMaximize: (
    callback: (e: IpcRendererEvent, isMaximized: boolean) => void,
  ) => {
    ipcRenderer.on("onToggleMaximize", callback);
    return () => ipcRenderer.off("onToggleMaximize", callback);
  },
};
