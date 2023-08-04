import { ipcMain } from "electron";
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
