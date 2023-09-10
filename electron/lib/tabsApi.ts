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

  ipcMain.handle("createTab", (_, initialUrl?: string) =>
    tabs.createTab(initialUrl),
  );
  ipcMain.handle("setActiveTab", (_, id: number) => tabs.setActiveTab(id));
  ipcMain.handle("closeTab", (_, id: number) => tabs.closeTab(id));
}

export const tabsApi = {
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getActiveTabId: () => ipcRenderer.invoke("getActiveTabId"),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),

  createTab: (initialUrl?: string) =>
    ipcRenderer.invoke("createTab", initialUrl),
  setActiveTab: (id: number) => ipcRenderer.invoke("setActiveTab", id),
  closeTab: (id: number) => ipcRenderer.invoke("closeTab", id),
};
