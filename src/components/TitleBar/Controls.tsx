import TitleBarButton from "@/components/TitleBar/TitleBarButton.tsx";
import {
  ArrowLeft16Regular,
  ArrowRight16Regular,
  Add16Regular,
} from "@fluentui/react-icons";

const { tabs } = window;

export default function Controls() {
  return (
    <div className="flex items-center z-50 ml-1">
      <TitleBarButton>
        <ArrowLeft16Regular />
      </TitleBarButton>
      <TitleBarButton>
        <ArrowRight16Regular />
      </TitleBarButton>
      <TitleBarButton onClick={() => tabs.createTab()}>
        <Add16Regular />
      </TitleBarButton>
    </div>
  );
}
