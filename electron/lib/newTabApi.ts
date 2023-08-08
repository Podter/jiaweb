import { ipcMain, ipcRenderer } from "electron";
import type { Tabs } from "./tabs.ts";

export function initNewTabApi(tabs: Tabs) {
  ipcMain.handle("newTabSearch", (_, query: string) => {
    const activeTab = tabs.getActiveTabId();
    tabs.setUrl(activeTab, "https://duckduckgo.com/?q=" + query);
  });
}

export const newTabApi = {
  search: (query: string) => ipcRenderer.invoke("newTabSearch", query),
};
