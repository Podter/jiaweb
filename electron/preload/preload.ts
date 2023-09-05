import { contextBridge } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { windowApi } from "../lib/window.ts";
import { tabsApi } from "../lib/tabsApi.ts";
import { menu } from "../lib/menu.ts";

contextBridge.exposeInMainWorld("appWindow", windowApi);
contextBridge.exposeInMainWorld("tabs", tabsApi);
contextBridge.exposeInMainWorld("menu", menu);

process.once("loaded", () => {
  exposeElectronTRPC();
});
