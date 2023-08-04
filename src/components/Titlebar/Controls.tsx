import TitlebarButton from "@/components/Titlebar/TitlebarButton.tsx";
import {
  ArrowLeft16Regular,
  ArrowRight16Regular,
  Add16Regular,
} from "@fluentui/react-icons";

export default function Controls() {
  return (
    <div className="flex items-center z-50 ml-1">
      <TitlebarButton>
        <ArrowLeft16Regular />
      </TitlebarButton>
      <TitlebarButton>
        <ArrowRight16Regular />
      </TitlebarButton>
      <TitlebarButton>
        <Add16Regular />
      </TitlebarButton>
    </div>
  );
}
