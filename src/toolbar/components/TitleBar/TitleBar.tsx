import styles from "./TitleBar.module.css";
import { cn } from "@/lib/utils.ts";
import Controls from "./Controls.tsx";
import SearchInput from "./SearchInput";
import Menu from "./Menu.tsx";

import { trpc } from "@/lib/trpc.tsx";

export default function TitleBar() {
  const { data } = trpc.test.hello.useQuery("world");

  console.log(data);

  return (
    <div
      className={cn(
        "h-12 bg-background flex fixed top-0 left-0 right-0 border-b border-border z-40",
        styles.titlebar,
      )}
    >
      <div className="flex justify-between items-center w-full">
        <Controls />
        <SearchInput />
        <Menu />
      </div>
    </div>
  );
}
