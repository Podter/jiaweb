import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { TabData } from "../../../electron/lib/tabs.ts";

const { tabs } = window;

const ActiveTabContext = createContext<TabData | null>(null);

export const useActiveTab = () => useContext(ActiveTabContext);

export function ActiveTabProvider({ children }: PropsWithChildren) {
  const [tab, setTab] = useState<TabData | null>(null);

  useEffect(() => {
    let tabId = -1;

    tabs.getActiveTabId().then((id) => {
      tabId = id;
      tabs.getTab(id).then(setTab);
    });

    const unlistenOnTabSwitched = tabs.onTabSwitched((_, id) => {
      tabId = id;
      tabs.getTab(id).then(setTab);
    });

    const unlistenOnTabDataChanged = tabs.onTabDataChanged((_, id, data) => {
      if (tabId !== id) return;
      setTab(data);
    });

    return () => {
      unlistenOnTabSwitched();
      unlistenOnTabDataChanged();
    };
  }, []);

  return (
    <ActiveTabContext.Provider value={tab}>
      {children}
    </ActiveTabContext.Provider>
  );
}
