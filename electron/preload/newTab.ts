import { contextBridge } from "electron";
import { newTabApi } from "../lib/newTabApi.ts";

contextBridge.exposeInMainWorld("newTab", newTabApi);
