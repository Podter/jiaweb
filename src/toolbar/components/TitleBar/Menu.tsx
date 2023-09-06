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
import { trpc, trpcClient } from "@/lib/trpc.tsx";

export default function Menu() {
  const [maximized, setMaximized] = useState(false);

  const { mutate: moreMenu } = trpc.menu.moreMenu.useMutation();
  const { mutate: favoritesMenu } = trpc.menu.favoritesMenu.useMutation();

  const { mutate: close } = trpc.window.close.useMutation();
  const { mutate: toggleMaximize } = trpc.window.toggleMaximize.useMutation();
  const { mutate: minimize } = trpc.window.minimize.useMutation();

  trpc.window.onToggleMaximize.useSubscription(undefined, {
    onData(maximized) {
      setMaximized(maximized);
    },
  });

  useEffect(() => {
    trpcClient.window.isMaximized.query().then(setMaximized);
  }, []);

  return (
    <div className="flex justify-end items-center z-50">
      <TitleBarButton onClick={() => favoritesMenu()}>
        <StarLineHorizontal316Regular />
      </TitleBarButton>
      <TitleBarButton className="mr-1" onClick={() => moreMenu()}>
        <MoreHorizontal16Regular />
      </TitleBarButton>
      <TitleBarButton className="rounded-none h-12" onClick={() => minimize()}>
        <Subtract16Regular />
      </TitleBarButton>
      <TitleBarButton
        className="rounded-none h-12"
        onClick={() => toggleMaximize()}
      >
        {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
      </TitleBarButton>
      <TitleBarButton
        className="hover:text-destructive-foreground hover:bg-destructive/90 rounded-none h-12"
        onClick={() => close()}
      >
        <Dismiss16Regular />
      </TitleBarButton>
    </div>
  );
}
