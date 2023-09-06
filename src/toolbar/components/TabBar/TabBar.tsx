import Tab from "./Tab.tsx";
import { cn } from "@/lib/utils.ts";
import { useActiveTab } from "@/toolbar/contexts/ActiveTabContext.tsx";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc.tsx";

const { tabs: tabsApi } = window;

export default function TabBar() {
  const [tabs, setTabs] = useState<number[]>([]);
  const activeTab = useActiveTab();

  trpc.tab.onTabListChanged.useSubscription(undefined, {
    onData(tabs) {
      setTabs(tabs);
    },
  });

  useEffect(() => {
    tabsApi.getTabIds().then((tabs) => setTabs(tabs));
  }, []);

  return (
    <div
      className={cn(
        "h-9 w-full bg-background justify-stretch items-center flex fixed top-12 left-0 right-0 border-b border-border z-40",
        tabs.length <= 1 && "hidden",
      )}
    >
      {tabs.map((tab) => (
        <Tab key={tab} tabId={tab} selected={activeTab?.id === tab} />
      ))}
    </div>
  );
}
