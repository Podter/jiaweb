import styles from "../TitleBar.module.css";
import { cn } from "@/lib/utils.ts";
import HostnameDisplay from "./HostnameDisplay.tsx";
import { useEffect, useState } from "react";
import UrlInput from "./UrlInput.tsx";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";
import usePrevious from "@/hooks/usePrevious.ts";

export default function SearchInput() {
  const activeTab = useActiveTab();

  const [inputMode, setInputMode] = useState(false);
  const prevUrl = usePrevious(activeTab?.url);

  useEffect(() => {
    if (activeTab && activeTab.url !== prevUrl) {
      setInputMode(false);
    }
  }, [activeTab]);

  return (
    <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
      <div
        className={cn(
          "flex justify-center items-center relative w-[40vw]",
          styles.nodrag,
        )}
      >
        {inputMode ? (
          <UrlInput cancel={() => setInputMode(false)} />
        ) : (
          <HostnameDisplay onClick={() => setInputMode(true)} />
        )}
      </div>
    </div>
  );
}
