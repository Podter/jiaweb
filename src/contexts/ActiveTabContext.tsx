import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { TabData } from "../../electron/lib/tabs.ts";

const { tabs } = window;

const ActiveTabContext = createContext<TabData | null>(null);

export const useActiveTab = () => useContext(ActiveTabContext);

export function ActiveTabProvider({ children }: PropsWithChildren) {
  const [tab, setTab] = useState<TabData | null>(null);

  useEffect(() => {
    tabs.getActiveTabId().then((id) => {
      tabs.getTab(id).then(setTab);
    });

    const unlisten = tabs.onTabSwitched((_, id) => {
      tabs.getTab(id).then(setTab);
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <ActiveTabContext.Provider value={tab}>
      {children}
    </ActiveTabContext.Provider>
  );
}
