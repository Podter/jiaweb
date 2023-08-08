import { ipcMain, type BrowserWindow, ipcRenderer } from "electron";
import { initMoreMenu } from "../menu/moreMenu.ts";
import type { Tabs } from "./tabs.ts";

export function initMenuApi(win: BrowserWindow, tabs: Tabs) {
  const moreMenu = initMoreMenu(tabs);

  ipcMain.handle("moreMenu", () => {
    moreMenu.popup({ window: win });
    return;
  });
}

export const menuApi = {
  moreMenu: () => ipcRenderer.invoke("moreMenu"),
};
