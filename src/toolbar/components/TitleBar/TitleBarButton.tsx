import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./TitleBar.module.css";
import { cn } from "@/lib/utils.ts";

const TitleBarButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "inline-flex rounded-md h-10 w-10 justify-center items-center transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
      styles.nodrag,
      className,
    )}
    ref={ref}
    {...props}
  />
));
TitleBarButton.displayName = "TitleBarButton";

export default TitleBarButton;
