import {
  ipcMain,
  type BrowserWindow,
  ipcRenderer,
  IpcRendererEvent,
} from "electron";

export function initWindowApi(win: BrowserWindow) {
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

  win.on("maximize", () => win.webContents.send("onToggleMaximize", true));
  win.on("unmaximize", () => win.webContents.send("onToggleMaximize", false));
}

export const windowApi = {
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
  toggleMaximize: () => ipcRenderer.invoke("toggleMaximize"),
  isMaximized: () => ipcRenderer.invoke("isMaximized"),
  onToggleMaximize: (
    callback: (e: IpcRendererEvent, isMaximized: boolean) => void,
  ) => {
    ipcRenderer.on("onToggleMaximize", callback);
    return () => ipcRenderer.off("onToggleMaximize", callback);
  },
};
