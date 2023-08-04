import {
  BrowserView,
  type BrowserWindow,
  type WebContents,
  screen,
} from "electron";
import { toolbarHeight } from "../constants.ts";
import type { TabData } from "./tabsApi.ts";

export class Tab {
  private readonly view: BrowserView;

  webContents: WebContents;
  id: number;
  favicons: string[] = [];

  private readonly handleResize = () => {
    const bounds = this.window.getBounds();
    const mainScreen = screen.getPrimaryDisplay();

    this.view.setBounds({
      x: 0,
      y: toolbarHeight,
      width: bounds.width,
      height: bounds.height - toolbarHeight,
    });

    if (this.window.isMaximized() || this.window.isFullScreen()) {
      this.window.setSize(
        mainScreen.workArea.width,
        mainScreen.workArea.height,
      );
      this.view.setBounds({
        x: 0,
        y: toolbarHeight,
        width: mainScreen.workArea.width,
        height: mainScreen.workArea.height - toolbarHeight,
      });
    }
  };

  private readonly handleFavicons = (_: unknown, favicons: string[]) => {
    this.favicons = favicons;
  };

  constructor(private window: BrowserWindow) {
    this.view = new BrowserView();
    this.webContents = this.view.webContents;
    this.id = this.webContents.id;

    this.window.addBrowserView(this.view);

    this.webContents.on("page-favicon-updated", this.handleFavicons);
  }

  destroy() {
    this.hide();
    this.window.removeBrowserView(this.view);
    this.webContents.off("page-favicon-updated", this.handleFavicons);
    if (this.webContents.isDevToolsOpened()) {
      this.webContents.closeDevTools();
    }
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

  private getCurrentTab() {
    return this.tabs.get(this.activeTabId);
  }

  private getTabIds() {
    return Array.from(this.tabs.keys());
  }

  getTab(id: number): TabData | undefined {
    const tab = this.tabs.get(id);
    if (tab) {
      return {
        id: tab.id,
        url: tab.webContents.getURL(),
        title: tab.webContents.getTitle(),
        canGoBack: tab.webContents.canGoBack(),
        canGoForward: tab.webContents.canGoForward(),
        favicons: tab.favicons,
      };
    }

    return undefined;
  }

  getActiveTab() {
    return this.getTab(this.activeTabId);
  }

  getTabs() {
    return this.getTabIds().map((id) => this.getTab(id));
  }

  createTab() {
    const tab = new Tab(this.window);
    tab.webContents.loadURL("https://google.com");
    this.tabs.set(tab.id, tab);
    this.setActiveTab(tab.id);
    this.window.webContents.send("tabsChanged", this.getTabs());
    return tab.id;
  }

  setActiveTab(id: number) {
    if (this.tabs.has(id)) {
      this.activeTabId = id;
      this.tabs.forEach((tab) => tab.hide());
      this.tabs.get(id)?.show();
      this.window.webContents.send("tabSwitched", id);
    }
  }

  closeTab(id: number) {
    const tab = this.tabs.get(id);
    if (tab) {
      tab.destroy();
      this.tabs.delete(id);
      if (id === this.activeTabId) {
        const tabIds = this.getTabIds();
        this.setActiveTab(tabIds[tabIds.length - 1]);
      }
      this.window.webContents.send("tabsChanged", this.getTabs());
    }
  }

  forward() {
    this.getCurrentTab()?.webContents.goForward();
  }

  back() {
    this.getCurrentTab()?.webContents.goBack();
  }

  reload() {
    this.getCurrentTab()?.webContents.reload();
  }

  destroy() {
    this.tabs.forEach((tab) => tab.destroy());
  }
}
