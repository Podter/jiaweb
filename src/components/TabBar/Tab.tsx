import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Dismiss12Regular, DocumentRegular } from "@fluentui/react-icons";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  favicon?: string;
  selected?: boolean;
}

const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ title, favicon, selected, className, ...props }, ref) => (
    <div
      className={cn(
        "inline-flex h-full w-full justify-center items-center border-r border-border relative transition-colors hover:bg-accent/50 hover:text-foreground group text-sm",
        !selected && "bg-accent text-accent-foreground",
        className,
      )}
      ref={ref}
      {...props}
    >
      <button className="flex justify-center items-center h-full w-full">
        {favicon ? (
          <img className="h-3 w-3 mr-2" src={favicon} alt={title} />
        ) : (
          <DocumentRegular scale={12} className="mr-2" />
        )}
        {title}
      </button>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-muted-foreground/20 absolute right-2 hidden group-hover:inline-flex"
      >
        <Dismiss12Regular />
      </Button>
    </div>
  ),
);
Tab.displayName = "Tab";

export default Tab;
