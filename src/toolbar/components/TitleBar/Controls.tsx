import TitleBarButton from "./TitleBarButton.tsx";
import {
  ArrowLeft16Regular,
  ArrowRight16Regular,
  Add16Regular,
} from "@fluentui/react-icons";
import { useActiveTab } from "@/toolbar/contexts/ActiveTabContext.tsx";
import { trpcClient } from "@/lib/trpc.tsx";

export default function Controls() {
  const activeTabId = useActiveTab();

  return (
    <div className="flex items-center z-50 ml-1">
      <TitleBarButton
        onClick={async () => {
          if (!activeTabId) return;
          await trpcClient.tab.back.mutate(activeTabId.id);
        }}
        disabled={!activeTabId || !activeTabId.canGoBack}
      >
        <ArrowLeft16Regular />
      </TitleBarButton>
      <TitleBarButton
        onClick={async () => {
          if (!activeTabId) return;
          await trpcClient.tab.forward.mutate(activeTabId.id);
        }}
        disabled={!activeTabId || !activeTabId.canGoForward}
      >
        <ArrowRight16Regular />
      </TitleBarButton>
      <TitleBarButton onClick={() => trpcClient.tab.createTab.mutate()}>
        <Add16Regular />
      </TitleBarButton>
    </div>
  );
}
