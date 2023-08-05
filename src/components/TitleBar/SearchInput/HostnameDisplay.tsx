import { Button } from "@/components/ui/button.tsx";
import {
  ArrowClockwise12Regular,
  Dismiss12Regular,
  LockClosed12Regular,
  Star12Regular,
} from "@fluentui/react-icons";
import { Input } from "@/components/ui/input.tsx";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";
import { useEffect, useState } from "react";

const { tabs } = window;

type Props = {
  onClick?: () => void;
};

export default function HostnameDisplay({ onClick }: Props) {
  const activeTab = useActiveTab();

  const [hostname, setHostname] = useState("");

  useEffect(() => {
    try {
      if (!activeTab) {
        setHostname("");
        return;
      }
      const url = new URL(activeTab.url);
      setHostname(url.hostname);
    } catch {
      setHostname("");
    }
  }, [activeTab]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 absolute left-1 z-50"
      >
        <LockClosed12Regular />
      </Button>
      <Input
        className="h-8 text-center !z-0"
        value={hostname}
        readOnly
        onClick={onClick}
      />
      <div className="absolute right-1 z-50 flex justify-end items-center">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 z-50">
          <Star12Regular />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 z-50"
          onClick={() => {
            if (!activeTab) return;
            if (activeTab.isLoading) {
              tabs.stop(activeTab.id);
            } else {
              tabs.reload(activeTab.id);
            }
          }}
        >
          {activeTab?.isLoading ? (
            <Dismiss12Regular />
          ) : (
            <ArrowClockwise12Regular />
          )}
        </Button>
      </div>
    </>
  );
}
