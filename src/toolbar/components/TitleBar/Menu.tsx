import TitleBarButton from "./TitleBarButton.tsx";
import {
  StarLineHorizontal316Regular,
  Dismiss16Regular,
  Maximize16Regular,
  SquareMultiple16Regular,
  Subtract16Regular,
  MoreHorizontal16Regular,
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";

const { appWindow, menu } = window;

export default function Menu() {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    appWindow.isMaximized().then((maximized) => setMaximized(maximized));

    const unlisten = appWindow.onToggleMaximize((_, maximized) =>
      setMaximized(maximized),
    );

    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className="flex justify-end items-center z-50">
      <TitleBarButton onClick={() => menu.favoritesMenu()}>
        <StarLineHorizontal316Regular />
      </TitleBarButton>
      <TitleBarButton className="mr-1" onClick={() => menu.moreMenu()}>
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
