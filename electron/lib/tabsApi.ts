import { ipcMain, ipcRenderer } from "electron";
import type { Tabs } from "./tabs.ts";

export function initTabsApi(tabs: Tabs) {
  ipcMain.handle("getTab", (_, id: number) => {
    const tab = tabs.getTab(id);
    if (!tab) return undefined;
    return tab.getTabData();
  });
  ipcMain.handle("getActiveTabId", () => tabs.getActiveTabId());
  ipcMain.handle("getTabIds", () => tabs.getTabIds());
}

export const tabsApi = {
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getActiveTabId: () => ipcRenderer.invoke("getActiveTabId"),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),
};
