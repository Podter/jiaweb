import { ipcMain, ipcRenderer, IpcRendererEvent } from "electron";
import { Tabs } from "./tabs.ts";

export interface TabData {
  id: number;
  url: string;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function initTabsApi(tabs: Tabs) {
  ipcMain.handle("getTab", (_, id: number) => tabs.getTab(id));
  ipcMain.handle("getActiveTabId", () => tabs.getActiveTabId());
  ipcMain.handle("getTabIds", () => tabs.getTabIds());

  ipcMain.handle("createTab", () => tabs.createTab());
  ipcMain.handle("setActiveTab", (_, id: number) => tabs.setActiveTab(id));
  ipcMain.handle("closeTab", (_, id: number) => tabs.closeTab(id));

  ipcMain.handle("forward", () => tabs.forward());
  ipcMain.handle("back", () => tabs.back());
  ipcMain.handle("reload", () => tabs.reload());
}

export const tabsApi = {
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getActiveTabId: () => ipcRenderer.invoke("getActiveTabId"),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),

  createTab: () => ipcRenderer.invoke("createTab"),
  setActiveTab: (id: number) => ipcRenderer.invoke("setActiveTab", id),
  closeTab: (id: number) => ipcRenderer.invoke("closeTab", id),

  forward: () => ipcRenderer.invoke("forward"),
  back: () => ipcRenderer.invoke("back"),
  reload: () => ipcRenderer.invoke("reload"),

  onTabsChanged: (
    callback: (e: IpcRendererEvent, tabIds: number[]) => void,
  ) => {
    ipcRenderer.on("tabsChanged", callback);
    return () => ipcRenderer.off("tabsChanged", callback);
  },
  onTabSwitched: (callback: (e: IpcRendererEvent, id: number) => void) => {
    ipcRenderer.on("tabSwitched", callback);
    return () => ipcRenderer.off("tabSwitched", callback);
  },
};
