import { Menu, nativeTheme } from "electron";
import type { Tabs } from "../lib/tabs.ts";
import { githubUrl } from "../constants.ts";
import type { StoreType } from "../main.ts";

export function createMoreMenu(tabs: Tabs, store: StoreType) {
  return Menu.buildFromTemplate([
    {
      id: "newTab",
      label: "New Tab",
      accelerator: "CmdOrCtrl+T",
      click: () => tabs.createTab(),
    },
    {
      type: "separator",
    },
    {
      id: "toogleTheme",
      label: "Toogle Theme",
      click: () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = "light";
          store.set("theme", "light");
        } else {
          nativeTheme.themeSource = "dark";
          store.set("theme", "dark");
        }
      },
    },
    {
      type: "separator",
    },
    {
      id: "github",
      label: "Open GitHub",
      click: () => tabs.createTab(githubUrl),
    },
    {
      id: "about",
      label: "About",
    },
    {
      type: "separator",
    },
    {
      id: "exit",
      label: "Exit",
      role: "quit",
    },
  ]);
}
