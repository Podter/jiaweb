import TitleBarButton from "@/components/TitleBar/TitleBarButton.tsx";
import {
  StarLineHorizontal316Regular,
  MoreHorizontal16Regular,
  Dismiss16Regular,
  Maximize16Regular,
  SquareMultiple16Regular,
  Subtract16Regular,
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";

const { appWindow } = window;

export default function Menu() {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    function handler() {
      appWindow.isMaximized().then((maximized) => setMaximized(maximized));
    }

    handler();
    const unlisten = appWindow.onResized(handler);

    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className="flex justify-end items-center z-50">
      <TitleBarButton>
        <StarLineHorizontal316Regular />
      </TitleBarButton>
      <TitleBarButton className="mr-1">
        <MoreHorizontal16Regular />
      </TitleBarButton>
      <TitleBarButton
        className="rounded-none h-12"
        onClick={() => appWindow.minimize()}
      >
        <Subtract16Regular />
      </TitleBarButton>
      <TitleBarButton
        className="rounded-none h-12"
        onClick={() => appWindow.toggleMaximize()}
      >
        {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
      </TitleBarButton>
      <TitleBarButton
        className="hover:text-destructive-foreground hover:bg-destructive/90 rounded-none h-12"
        onClick={() => appWindow.close()}
      >
        <Dismiss16Regular />
      </TitleBarButton>
    </div>
  );
}
