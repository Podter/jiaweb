import { ipcMain, type BrowserWindow } from "electron";

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
