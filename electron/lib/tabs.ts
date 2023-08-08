import {
  BrowserView,
  type BrowserWindow,
  type WebContents,
  screen,
} from "electron";
import { titleBarHeight, tabBarHeight } from "../constants.ts";
import contextMenu from "electron-context-menu";
import { initRightClickMenu } from "../menu/rightClickMenu.ts";
import { VITE_DEV_SERVER_URL } from "../main.ts";
import path from "node:path";

export interface TabData {
  id: number;
  title?: string;
  url?: string;
  favicon?: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export class Tab {
  private readonly view: BrowserView;
  private readonly disposeContextMenu: () => void;
  webContents: WebContents;

  id: number;
  title?: string;
  url?: string;
  favicon?: string;
  isLoading: boolean = false;
  canGoBack: boolean = false;
  canGoForward: boolean = false;

  private readonly handleResize = () => {
    const bounds = this.window.getBounds();
    const mainScreen = screen.getPrimaryDisplay();
    const height =
      titleBarHeight + (this.tabs.getTabIds().length > 1 ? tabBarHeight : 0);

    this.view.setBounds({
      x: 0,
      y: height,
      width: bounds.width,
      height: bounds.height - height,
    });

    if (this.window.isMaximized() || this.window.isFullScreen()) {
      this.window.setSize(
        mainScreen.workArea.width,
        mainScreen.workArea.height,
      );
      this.view.setBounds({
        x: 0,
        y: height,
        width: mainScreen.workArea.width,
        height: mainScreen.workArea.height - height,
      });
    }
  };

  private readonly fireDataChanged = () => {
    this.url = this.webContents.getURL();
    this.canGoBack = this.webContents.canGoBack();
    this.canGoForward = this.webContents.canGoForward();
    const tabData = this.getTabData();
    this.window.webContents.send("tabDataChanged", this.id, tabData);
  };

  constructor(
    private window: BrowserWindow,
    private readonly tabs: Tabs,
    private readonly initialUrl?: string,
  ) {
    this.view = new BrowserView();
    this.webContents = this.view.webContents;
    this.id = this.webContents.id;

    if (this.initialUrl) {
      this.url = this.initialUrl;
      this.webContents.loadURL(this.initialUrl);
    } else {
      if (VITE_DEV_SERVER_URL) {
        this.webContents.loadURL(VITE_DEV_SERVER_URL + "src/newtab/index.html");
      } else {
        this.webContents.loadFile(
          path.join(process.env.DIST, "src", "newtab", "index.html"),
        );
      }
    }

    this.disposeContextMenu = contextMenu(initRightClickMenu(this, this.tabs));
    this.window.addBrowserView(this.view);

    this.webContents
      .on("did-start-loading", () => {
        this.isLoading = true;
        this.fireDataChanged();
      })
      .on("did-start-navigation", () => this.fireDataChanged())
      .on("will-redirect", () => this.fireDataChanged())
      .on("page-title-updated", (_, title) => {
        if (title !== "") {
          this.title = title;
        } else {
          this.title = undefined;
        }
        this.fireDataChanged();
      })
      .on("page-favicon-updated", (_, favicons) => {
        const favicon = favicons[0];
        if (favicon !== "" && favicon !== undefined) {
          this.favicon = favicons[0];
        } else {
          this.favicon = undefined;
        }
        this.fireDataChanged();
      })
      .on("did-stop-loading", () => {
        this.isLoading = false;
        this.fireDataChanged();
      })
      .on("dom-ready", () => this.webContents.focus())
      .setWindowOpenHandler(({ url, disposition }) => {
        if (disposition === "new-window") return { action: "allow" };

        tabs.createTab(url);
        return { action: "deny" };
      });
  }

  getTabData(): TabData {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      favicon: this.favicon,
      isLoading: this.isLoading,
      canGoBack: this.canGoBack,
      canGoForward: this.canGoForward,
    };
  }

  destroy() {
    this.hide();
    this.disposeContextMenu();
    if (!this.window.isDestroyed()) {
      this.window.removeBrowserView(this.view);
    }
    if (this.webContents.isDevToolsOpened()) {
      this.webContents.closeDevTools();
    }
    this.webContents.removeAllListeners();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.webContents.destroy();
  }

  show() {
    this.window.on("resize", this.handleResize);
    this.handleResize();
  }

  hide() {
    this.window.off("resize", this.handleResize);
    this.view.setBounds({ x: -1000, y: 0, width: 0, height: 0 });
  }
}

export class Tabs {
  private tabs: Map<number, Tab>;
  private activeTabId: number;

  constructor(private window: BrowserWindow) {
    this.tabs = new Map();
    this.activeTabId = -1;
  }

  getTab(id: number) {
    return this.tabs.get(id);
  }

  getActiveTabId() {
    return this.activeTabId;
  }

  getTabIds() {
    return Array.from(this.tabs.keys());
  }

  createTab(initialUrl?: string) {
    const tab = new Tab(this.window, this, initialUrl);
    this.tabs.set(tab.id, tab);
    this.setActiveTab(tab.id);
    this.window.webContents.send("tabListChanged", this.getTabIds());
    return tab.id;
  }

  setActiveTab(id: number) {
    if (this.tabs.has(id)) {
      this.activeTabId = id;
      this.tabs.forEach((tab) => tab.hide());
      this.getTab(id)?.show();
      this.window.webContents.send("tabSwitched", id);
    }
  }

  closeTab(id: number) {
    const tab = this.getTab(id);
    if (tab) {
      tab.destroy();
      this.tabs.delete(id);
      if (id === this.activeTabId) {
        const tabIds = this.getTabIds();
        this.setActiveTab(tabIds[tabIds.length - 1]);
      }
      this.window.webContents.send("tabListChanged", this.getTabIds());
    }
  }

  forward(id: number) {
    const tab = this.getTab(id);
    if (tab) {
      tab.webContents.goForward();
    }
  }

  back(id: number) {
    const tab = this.getTab(id);
    if (tab) {
      tab.webContents.goBack();
    }
  }

  reload(id: number) {
    const tab = this.getTab(id);
    if (tab) {
      tab.webContents.reload();
    }
  }

  stop(id: number) {
    const tab = this.getTab(id);
    if (tab) {
      tab.webContents.stop();
    }
  }

  setUrl(id: number, url: string) {
    const tab = this.getTab(id);
    if (tab) {
      tab.webContents.loadURL(url);
    }
  }

  destroy() {
    this.tabs.forEach((tab) => tab.destroy());
  }
}
