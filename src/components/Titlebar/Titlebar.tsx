import styles from "./Titlebar.module.css";
import TitlebarButton from "./TitlebarButton";
import {
  Subtract16Regular,
  Maximize16Regular,
  SquareMultiple16Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";
import SearchInput from "@/components/Titlebar/SearchInput.tsx";

const { appWindow } = window;

export default function Titlebar() {
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
    <div
      className={cn(
        "h-12 bg-background select-none flex fixed top-0 left-0 right-0 border-b border-border z-40",
        styles.titlebar,
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div />
        <SearchInput />
        <div className="flex justify-end z-50">
          <TitlebarButton onClick={() => appWindow.minimize()}>
            <Subtract16Regular />
          </TitlebarButton>
          <TitlebarButton onClick={() => appWindow.toggleMaximize()}>
            {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
          </TitlebarButton>
          <TitlebarButton
            className="hover:text-destructive-foreground hover:bg-destructive/90"
            onClick={() => appWindow.close()}
          >
            <Dismiss16Regular />
          </TitlebarButton>
        </div>
      </div>
    </div>
  );
}
