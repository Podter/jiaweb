import Tab from "./Tab.tsx";
import { cn } from "@/lib/utils.ts";
import { useActiveTab } from "@/toolbar/contexts/ActiveTabContext.tsx";
import { useEffect, useState } from "react";
import { trpc, trpcClient } from "@/lib/trpc.tsx";

export default function TabBar() {
  const [tabs, setTabs] = useState<number[]>([]);
  const activeTab = useActiveTab();

  trpc.tab.onTabListChanged.useSubscription(undefined, {
    onData(tabs) {
      setTabs(tabs);
    },
  });

  useEffect(() => {
    trpcClient.tab.getTabIds.query().then(setTabs);
  }, []);

  return (
    <div
      className={cn(
        "h-9 w-full bg-background justify-stretch items-center flex fixed top-12 left-0 right-0 border-b border-border z-40",
        tabs.length <= 1 && "hidden",
      )}
    >
      {Array.isArray(tabs) &&
        tabs.map((tab) => (
          <Tab key={tab} tabId={tab} selected={activeTab?.id === tab} />
        ))}
    </div>
  );
}
