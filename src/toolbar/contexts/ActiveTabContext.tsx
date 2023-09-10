import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { TabData } from "../../../electron/lib/tabs.ts";
import { trpc, trpcClient } from "@/lib/trpc.tsx";

const ActiveTabContext = createContext<TabData | undefined>(undefined);

export const useActiveTab = () => useContext(ActiveTabContext);

export function ActiveTabProvider({ children }: PropsWithChildren) {
  const [tabId, setTabId] = useState(-1);
  const [tab, setTab] = useState<TabData | undefined>(undefined);

  trpc.tab.onTabSwitched.useSubscription(undefined, {
    onData(id) {
      setTabId(id);
      trpcClient.tab.getTab.query(id).then(setTab);
    },
  });

  trpc.tab.onTabDataChanged.useSubscription(undefined, {
    onData({ id, data }) {
      if (tabId !== id) return;
      setTab(data);
    },
  });

  useEffect(() => {
    trpcClient.tab.getActiveTabId.query().then((id) => {
      setTabId(id);
      trpcClient.tab.getTab.query(id).then(setTab);
    });
  }, []);

  return (
    <ActiveTabContext.Provider value={tab}>
      {children}
    </ActiveTabContext.Provider>
  );
}
