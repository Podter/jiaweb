import { contextBridge } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { tabsApi } from "./lib/tabsApi.ts";

contextBridge.exposeInMainWorld("tabs", tabsApi);

process.once("loaded", () => {
  exposeElectronTRPC();
});
