import styles from "./TitleBar.module.css";
import { cn } from "@/lib/utils.ts";
import { Input } from "@/components/ui/input.tsx";
import {
  Star12Regular,
  ArrowClockwise12Regular,
  LockClosed12Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button.tsx";

export default function SearchInput() {
  return (
    <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
      <div
        className={cn(
          "flex justify-center items-center relative w-[40vw]",
          styles.nodrag,
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 absolute left-1 z-50"
        >
          <LockClosed12Regular />
        </Button>
        <Input
          className="h-8 text-center !z-0"
          placeholder="Search or enter web address"
          value="google.com"
          readOnly
        />
        <div className="absolute right-1 z-50 flex justify-end items-center">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 z-50">
            <Star12Regular />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 z-50">
            <ArrowClockwise12Regular />
          </Button>
        </div>
      </div>
    </div>
  );
}
