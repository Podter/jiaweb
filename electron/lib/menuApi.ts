import { ipcMain, type BrowserWindow, ipcRenderer } from "electron";
import { initMoreMenu } from "../menu/moreMenu.ts";
import type { Tabs } from "./tabs.ts";
import type { StoreType } from "../main.ts";

export function initMenuApi(win: BrowserWindow, tabs: Tabs, store: StoreType) {
  const moreMenu = initMoreMenu(tabs, store);

  ipcMain.handle("moreMenu", () => {
    moreMenu.popup({ window: win });
    return;
  });
}

export const menuApi = {
  moreMenu: () => ipcRenderer.invoke("moreMenu"),
};
