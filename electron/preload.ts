import { contextBridge } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { windowApi } from "./lib/window.ts";
import { tabsApi } from "./lib/tabsApi.ts";

contextBridge.exposeInMainWorld("appWindow", windowApi);
contextBridge.exposeInMainWorld("tabs", tabsApi);

process.once("loaded", () => {
  exposeElectronTRPC();
});
