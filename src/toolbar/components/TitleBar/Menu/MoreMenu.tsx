import { MoreHorizontal16Regular } from "@fluentui/react-icons";
import TitleBarButton from "../TitleBarButton.tsx";

export default function MoreMenu() {
  return (
    <TitleBarButton className="mr-1" onClick={() => window.menu.moreMenu()}>
      <MoreHorizontal16Regular />
    </TitleBarButton>
  );
}
