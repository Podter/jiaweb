import Tab from "./Tab.tsx";
import { cn } from "@/lib/utils.ts";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";
import { useEffect, useState } from "react";

const { tabs: tabsApi } = window;

export default function TabBar() {
  const [tabs, setTabs] = useState<number[]>([]);
  const activeTabId = useActiveTab();

  useEffect(() => {
    tabsApi.getTabIds().then((tabs) => setTabs(tabs));

    const unlisten = tabsApi.onTabListChanged((_, tabs) => setTabs(tabs));

    return () => {
      unlisten();
    };
  }, []);

  return (
    <div
      className={cn(
        "h-9 w-full bg-background justify-stretch items-center flex fixed top-12 left-0 right-0 border-b border-border z-40",
        tabs.length <= 1 && "hidden",
      )}
    >
      {tabs.map((tab) => (
        <Tab key={tab} tabId={tab} selected={activeTabId?.id === tab} />
      ))}
    </div>
  );
}
