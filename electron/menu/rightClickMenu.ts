import type { Options } from "electron-context-menu";
import type { Tab, Tabs } from "../lib/tabs.ts";

export function initRightClickMenu(tab: Tab, tabs: Tabs): Options {
  return {
    window: tab.webContents,
    showSearchWithGoogle: false,
    showSelectAll: true,
    showCopyImage: true,
    showCopyImageAddress: true,
    showSaveImage: true,
    showSaveImageAs: true,
    showCopyVideoAddress: true,
    showSaveVideo: true,
    showSaveVideoAs: true,
    showCopyLink: true,
    showSaveLinkAs: true,
    showInspectElement: true,
    prepend: (defaultActions, parameters) => [
      {
        id: "back",
        label: "Back",
        enabled: tab.canGoBack,
        click: () => tab.webContents.goBack(),
      },
      {
        id: "forward",
        label: "Forward",
        enabled: tab.canGoForward,
        click: () => tab.webContents.goForward(),
      },
      {
        id: "reload",
        label: "Reload",
        click: () => tab.webContents.reload(),
      },
      defaultActions.separator(),
      {
        id: "searchWithGoogle",
        label: `Search Google for "{selection}"`,
        visible: parameters.selectionText.trim().length > 0,
        click: () => {
          const url =
            "https://www.google.com/search?q=" +
            encodeURIComponent(parameters.selectionText);
          tabs.createTab(url);
        },
      },
    ],
  };
}
