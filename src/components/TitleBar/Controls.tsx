import TitleBarButton from "@/components/TitleBar/TitleBarButton.tsx";
import {
  ArrowLeft16Regular,
  ArrowRight16Regular,
  Add16Regular,
} from "@fluentui/react-icons";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";

const { tabs } = window;

export default function Controls() {
  const activeTabId = useActiveTab();

  return (
    <div className="flex items-center z-50 ml-1">
      <TitleBarButton
        onClick={() => {
          if (!activeTabId) return;
          tabs.back(activeTabId.id);
        }}
        disabled={!activeTabId || !activeTabId.canGoBack}
      >
        <ArrowLeft16Regular />
      </TitleBarButton>
      <TitleBarButton
        onClick={() => {
          if (!activeTabId) return;
          tabs.forward(activeTabId.id);
        }}
        disabled={!activeTabId || !activeTabId.canGoForward}
      >
        <ArrowRight16Regular />
      </TitleBarButton>
      <TitleBarButton onClick={() => tabs.createTab()}>
        <Add16Regular />
      </TitleBarButton>
    </div>
  );
}
