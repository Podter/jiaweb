import { Menu, type MenuItemConstructorOptions } from "electron";
import type { Tabs } from "../lib/tabs.ts";
import type { StoreType } from "../main.ts";

export function createFavoritesMenu(tabs: Tabs, store: StoreType) {
  const favorites = store.get("favorites");

  const items: MenuItemConstructorOptions[] = favorites.map((favorite) => ({
    label: favorite.title ?? favorite.url,
    click: () => tabs.createTab(favorite.url),
  }));

  return Menu.buildFromTemplate([
    {
      id: "addFavorite",
      label: "Add this page to favorites",
      accelerator: "CmdOrCtrl+D",
      click: () => tabs.addFavorite(tabs.getActiveTabId()),
    },
    {
      type: "separator",
    },
    ...items,
  ]);
}
