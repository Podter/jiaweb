import { Button } from "@/components/ui/button.tsx";
import {
  ArrowClockwise12Regular,
  Dismiss12Regular,
  LockClosed12Regular,
  LockOpen12Regular,
  Star12Regular,
  Star12Filled,
} from "@fluentui/react-icons";
import { Input } from "@/components/ui/input.tsx";
import { useActiveTab } from "@/toolbar/contexts/ActiveTabContext.tsx";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import icon90RingWithBg from "@iconify/icons-svg-spinners/90-ring-with-bg";
import { trpcClient } from "@/lib/trpc.tsx";

type Props = {
  onClick?: () => void;
  overrideHostname?: string;
};

export default function HostnameDisplay({ onClick, overrideHostname }: Props) {
  const activeTab = useActiveTab();

  const [hostname, setHostname] = useState("");
  const [secure, setSecure] = useState(false);

  useEffect(() => {
    try {
      if (!activeTab || !activeTab.url) {
        setHostname("");
        return;
      }
      const url = new URL(activeTab.url);
      setHostname(url.hostname);
      setSecure(url.protocol === "https:");
    } catch {
      setHostname("");
      setSecure(false);
    }
  }, [activeTab]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 absolute left-1 z-50"
      >
        {activeTab?.isLoading ? (
          <Icon icon={icon90RingWithBg} fontSize={12} />
        ) : secure ? (
          <LockClosed12Regular color="#16a34a" />
        ) : (
          <LockOpen12Regular color="#e11d48" />
        )}
      </Button>
      <Input
        className="h-8 text-center !z-0"
        value={overrideHostname ?? hostname}
        readOnly
        onClick={onClick}
      />
      <div className="absolute right-1 z-50 flex justify-end items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 z-50"
          onClick={async () => {
            if (!activeTab) return;
            if (activeTab.favorite) {
              await trpcClient.tab.removeFavorite.mutate(activeTab.id);
            } else {
              await trpcClient.tab.addFavorite.mutate(activeTab.id);
            }
          }}
        >
          {activeTab?.favorite ? <Star12Filled /> : <Star12Regular />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 z-50"
          onClick={async () => {
            if (!activeTab) return;
            if (activeTab.isLoading) {
              await trpcClient.tab.stop.mutate(activeTab.id);
            } else {
              await trpcClient.tab.reload.mutate(activeTab.id);
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
