import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { TabData } from "../../electron/lib/tabsApi.ts";

const TabsContext = createContext<TabData[] | undefined>(undefined);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}

export function TabsProvider({ children }: PropsWithChildren) {
  const [tabs, setTabs] = useState<TabData[]>([]);

  useEffect(() => {
    const unlisten = window.tabs.onTabsChanged((_, tabs) => setTabs(tabs));

    return () => {
      unlisten();
    };
  }, []);

  return <TabsContext.Provider value={tabs}>{children}</TabsContext.Provider>;
}
