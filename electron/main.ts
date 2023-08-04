import { app, BrowserWindow } from "electron";
import path from "node:path";
import { initWindowApi } from "./lib/window.ts";
import { toolbarHeight } from "./constants.ts";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

async function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // webviewTag: true,
    },
    width: 1280,
    height: 720 + toolbarHeight,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
  });

  initWindowApi(win);

  if (VITE_DEV_SERVER_URL) {
    await win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    await win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(createWindow);
