import { ipcMain, ipcRenderer, IpcRendererEvent } from "electron";
import { Tabs } from "./tabs.ts";

export function initTabsApi(tabs: Tabs) {
  ipcMain.handle("getActiveTab", () => tabs.getActiveTab());
  ipcMain.handle("getTab", (_, id: number) => tabs.getTab(id));
  ipcMain.handle("getTabIds", () => tabs.getTabIds());

  ipcMain.handle("createTab", () => tabs.createTab());
  ipcMain.handle("setActiveTab", (_, id: number) => tabs.setActiveTab(id));
  ipcMain.handle("closeTab", (_, id: number) => tabs.closeTab(id));

  ipcMain.handle("forward", () => tabs.forward());
  ipcMain.handle("back", () => tabs.back());
  ipcMain.handle("reload", () => tabs.reload());
}

export const tabsApi = {
  onTabDestroyed: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabDestroyed", callback);
    return () => ipcRenderer.off("tabDestroyed", callback);
  },
  onTabCreated: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabCreated", callback);
    return () => ipcRenderer.off("tabCreated", callback);
  },
  onTabChanged: (callback: (e: IpcRendererEvent, tabId: number) => void) => {
    ipcRenderer.on("tabChanged", callback);
    return () => ipcRenderer.off("tabChanged", callback);
  },

  getActiveTab: () => ipcRenderer.invoke("getActiveTab"),
  getTab: (id: number) => ipcRenderer.invoke("getTab", id),
  getTabIds: () => ipcRenderer.invoke("getTabIds"),

  createTab: () => ipcRenderer.invoke("createTab"),
  setActiveTab: (id: number) => ipcRenderer.invoke("setActiveTab", id),
  closeTab: (id: number) => ipcRenderer.invoke("closeTab", id),

  forward: () => ipcRenderer.invoke("forward"),
  back: () => ipcRenderer.invoke("back"),
  reload: () => ipcRenderer.invoke("reload"),
};