import { ipcMain, ipcRenderer, IpcRendererEvent } from "electron";
import type { Tabs, TabData } from "./tabs.ts";

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

  ipcMain.handle("forward", (_, id: number) => tabs.forward(id));
  ipcMain.handle("back", (_, id: number) => tabs.back(id));
  ipcMain.handle("reload", (_, id: number) => tabs.reload(id));
  ipcMain.handle("stop", (_, id: number) => tabs.stop(id));
  ipcMain.handle("setUrl", (_, id: number, url: string) =>
    tabs.setUrl(id, url),
  );

  ipcMain.handle("addFavorite", (_, id: number) => tabs.addFavorite(id));
  ipcMain.handle("removeFavorite", (_, id: number) => tabs.removeFavorite(id));
}

export const tabsApi = {
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getActiveTabId: () => ipcRenderer.invoke("getActiveTabId"),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),

  createTab: (initialUrl?: string) =>
    ipcRenderer.invoke("createTab", initialUrl),
  setActiveTab: (id: number) => ipcRenderer.invoke("setActiveTab", id),
  closeTab: (id: number) => ipcRenderer.invoke("closeTab", id),

  forward: (id: number) => ipcRenderer.invoke("forward", id),
  back: (id: number) => ipcRenderer.invoke("back", id),
  reload: (id: number) => ipcRenderer.invoke("reload", id),
  stop: (id: number) => ipcRenderer.invoke("stop", id),
  setUrl: (id: number, url: string) => ipcRenderer.invoke("setUrl", id, url),

  addFavorite: (id: number) => ipcRenderer.invoke("addFavorite", id),
  removeFavorite: (id: number) => ipcRenderer.invoke("removeFavorite", id),

  onTabListChanged: (
    callback: (e: IpcRendererEvent, tabIds: number[]) => void,
  ) => {
    ipcRenderer.on("tabListChanged", callback);
    return () => ipcRenderer.off("tabListChanged", callback);
  },
  onTabSwitched: (callback: (e: IpcRendererEvent, id: number) => void) => {
    ipcRenderer.on("tabSwitched", callback);
    return () => ipcRenderer.off("tabSwitched", callback);
  },
  onTabDataChanged: (
    callback: (e: IpcRendererEvent, id: number, data: TabData) => void,
  ) => {
    ipcRenderer.on("tabDataChanged", callback);
    return () => ipcRenderer.off("tabDataChanged", callback);
  },
};
