import Tab from "./Tab.tsx";
import { useTabs } from "@/contexts/TabsContext.tsx";
import { cn } from "@/lib/utils.ts";
import { useState, useEffect } from "react";

const { tabs: tabsApi } = window;

export default function TabBar() {
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(-1);

  useEffect(() => {
    tabsApi.getActiveTab().then((tab) => setSelectedTab(tab.id));

    const unlisten = tabsApi.onTabSwitched((_, id) => setSelectedTab(id));

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
        <Tab key={tab.id} tab={tab} selected={selectedTab === tab.id} />
      ))}
    </div>
  );
}
