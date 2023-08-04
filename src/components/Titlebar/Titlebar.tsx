import styles from "./Titlebar.module.css";
import { cn } from "@/lib/utils.ts";
import SearchInput from "./SearchInput.tsx";
import Menu from "./Menu.tsx";

export default function Titlebar() {
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
        <Menu />
      </div>
    </div>
  );
}
