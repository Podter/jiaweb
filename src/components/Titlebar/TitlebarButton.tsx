import styles from "./Titlebar.module.css";
import { cn } from "@/lib/utils";

export default function TitlebarButton({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex rounded-md h-10 w-10 justify-center items-center transition-colors hover:bg-accent hover:text-accent-foreground",
        styles.nodrag,
        className,
      )}
    />
  );
}
