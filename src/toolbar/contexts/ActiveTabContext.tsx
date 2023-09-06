import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { TabData } from "../../../electron/lib/tabs.ts";
import { trpc } from "@/lib/trpc.tsx";

const { tabs } = window;

const ActiveTabContext = createContext<TabData | null>(null);

export const useActiveTab = () => useContext(ActiveTabContext);

export function ActiveTabProvider({ children }: PropsWithChildren) {
  const [tabId, setTabId] = useState(-1);
  const [tab, setTab] = useState<TabData | null>(null);

  trpc.tab.onTabSwitched.useSubscription(undefined, {
    onData(id) {
      setTabId(id);
      tabs.getTab(id).then(setTab);
    },
  });

  trpc.tab.onTabDataChanged.useSubscription(undefined, {
    onData({ id, data }) {
      if (tabId !== id) return;
      setTab(data);
    },
  });

  useEffect(() => {
    tabs.getActiveTabId().then((id) => {
      setTabId(id);
      tabs.getTab(id).then(setTab);
    });
  }, []);

  return (
    <ActiveTabContext.Provider value={tab}>
      {children}
    </ActiveTabContext.Provider>
  );
}
