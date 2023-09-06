import { app, BrowserWindow, Menu, nativeTheme } from "electron";
import path from "node:path";
import {
  VITE_DEV_SERVER_URL,
  titleBarHeight,
  tabBarHeight,
} from "./constants.ts";
import { Tabs, type Favorite } from "./lib/tabs.ts";
import { initTabsApi } from "./lib/tabsApi.ts";
import Store from "electron-store";
import { createIPCHandler } from "electron-trpc/main";
import { createTRPCContext } from "./trpc/trpc.ts";
import { appRouter } from "./trpc/root.ts";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
let tabs: Tabs | null;
const store = new Store<{
  theme: "light" | "dark" | "system";
  favorites: Favorite[];
}>({
  defaults: {
    theme: "system",
    favorites: [],
  },
});

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

  // win.webContents.toggleDevTools();

  tabs = new Tabs(win, store);
  tabs.createTab();
  initTabsApi(tabs);

  createIPCHandler({
    router: appRouter,
    windows: [win],
    createContext: async () => createTRPCContext(win!, tabs!, store),
  });

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
