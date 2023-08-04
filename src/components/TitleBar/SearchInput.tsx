import styles from "./TitleBar.module.css";
import { cn } from "@/lib/utils.ts";
import { Input } from "@/components/ui/input.tsx";

export default function SearchInput() {
  return (
    <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
      <Input
        className={cn("w-[30rem] z-50 h-8 text-center", styles.nodrag)}
        placeholder="Search or enter web address"
        defaultValue="google.com"
      />
    </div>
  );
}
