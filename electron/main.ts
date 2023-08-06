import { app, BrowserWindow, Menu, nativeTheme } from "electron";
import path from "node:path";
import { initWindowApi } from "./lib/window.ts";
import { titleBarHeight, tabBarHeight } from "./constants.ts";
import { Tabs } from "./lib/tabs.ts";
import { initTabsApi } from "./lib/tabsApi.ts";
import Store from "electron-store";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let tabs: Tabs | null;
const store = new Store<{
  theme: "light" | "dark" | "system";
}>({
  defaults: {
    theme: "system",
  },
});
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

export type StoreType = typeof store;

async function createWindow() {
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1280,
    height: 720 + titleBarHeight + tabBarHeight,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
  });
  nativeTheme.themeSource = store.get("theme");
  initWindowApi(win, store);

  // win.webContents.toggleDevTools();

  tabs = new Tabs(win);
  tabs.createTab();
  initTabsApi(tabs);

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL + "src/toolbar/index.html");
  } else {
    await win.loadFile(
      path.join(process.env.DIST, "src", "toolbar", "index.html"),
    );
  }
}

app.on("window-all-closed", () => {
  win = null;

  tabs?.destroy();
  tabs = null;

  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(createWindow);
