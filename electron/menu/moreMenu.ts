import { Menu } from "electron";
import type { Tabs } from "../lib/tabs.ts";

export function initMoreMenu(tabs: Tabs) {
  return Menu.buildFromTemplate([
    {
      id: "newTab",
      label: "New Tab",
      accelerator: "CmdOrCtrl+T",
      click: () => tabs.createTab(),
    },
    {
      id: "toogleTheme",
      label: "Toogle Theme",
    },
    {
      type: "separator",
    },
    {
      id: "github",
      label: "Open GitHub",
      click: () => tabs.createTab("https://github.com/Podter/jiaweb"),
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
