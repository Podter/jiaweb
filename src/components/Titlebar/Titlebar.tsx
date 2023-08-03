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

export default function Titlebar() {
  const [maximized, setMaximized] = useState(false);

  // useEffect(() => {
  //   function handler() {
  //     appWindow.isMaximized().then((maximized) => setMaximized(maximized));
  //   }
  //
  //   handler();
  //   const unlisten = appWindow.onResized(handler);
  //
  //   return () => {
  //     unlisten.then((unlisten) => unlisten());
  //   };
  // }, []);

  return (
    <div
      className={cn(
        "h-10 bg-background select-none flex fixed top-0 left-0 right-0 justify-between items-center border-b border-border z-40",
        styles.titlebar,
      )}
    >
      <div />
      <div className="flex justify-end">
        <TitlebarButton onClick={() => {}}>
          <Subtract16Regular />
        </TitlebarButton>
        <TitlebarButton onClick={() => {}}>
          {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
        </TitlebarButton>
        <TitlebarButton
          className="hover:text-destructive-foreground hover:bg-destructive/90"
          onClick={() => {}}
        >
          <Dismiss16Regular />
        </TitlebarButton>
      </div>
    </div>
  );
}
