import type { PropsWithChildren } from "react";
import { TabsProvider } from "@/contexts/TabsContext.tsx";

export default function Providers({ children }: PropsWithChildren) {
  return <TabsProvider>{children}</TabsProvider>;
}
