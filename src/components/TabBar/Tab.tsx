import { forwardRef, type HTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Dismiss12Regular, DocumentRegular } from "@fluentui/react-icons";
import type { TabData } from "../../../electron/lib/tabs.ts";
import { Icon } from "@iconify/react";
import icon90RingWithBg from "@iconify/icons-svg-spinners/90-ring-with-bg";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  tabId: number;
  selected?: boolean;
}

const { tabs } = window;

const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ tabId, selected, className, ...props }, ref) => {
    const [tab, setTab] = useState<TabData | null>(null);

    useEffect(() => {
      tabs.getTab(tabId).then((tab) => setTab(tab));

      const unlisten = tabs.onTabDataChanged((_, id, data) => {
        if (id !== tabId) return;
        setTab(data);
      });

      return () => {
        unlisten();
      };
    }, []);

    if (!tab) return null;

    return (
      <div
        className={cn(
          "inline-flex h-full w-full justify-center items-center border-r border-border relative transition-colors hover:bg-accent/50 hover:text-foreground group text-sm",
          !selected && "bg-accent text-accent-foreground",
          className,
        )}
        ref={ref}
        {...props}
      >
        <button
          className="flex justify-center items-center h-full w-full"
          onClick={() => tabs.setActiveTab(tab.id)}
        >
          {tab.isLoading ? (
            <Icon icon={icon90RingWithBg} fontSize={12} className="mr-2" />
          ) : tab.favicon ? (
            <img className="h-3 w-3 mr-2" src={tab.favicon} alt={tab.title} />
          ) : (
            <DocumentRegular scale={12} className="mr-2" />
          )}
          {tab.title}
        </button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted-foreground/20 absolute right-2 hidden group-hover:inline-flex"
          onClick={() => tabs.closeTab(tab.id)}
        >
          <Dismiss12Regular />
        </Button>
      </div>
    );
  },
);
Tab.displayName = "Tab";

export default Tab;
