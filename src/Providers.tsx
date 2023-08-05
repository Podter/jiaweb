import type { PropsWithChildren } from "react";
import { ActiveTabProvider } from "@/contexts/ActiveTabContext.tsx";

export default function Providers({ children }: PropsWithChildren) {
  return <ActiveTabProvider>{children}</ActiveTabProvider>;
}
