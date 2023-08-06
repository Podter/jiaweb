import styles from "../TitleBar.module.css";
import { cn } from "@/lib/utils.ts";
import HostnameDisplay from "./HostnameDisplay.tsx";
import { useEffect, useState } from "react";
import UrlInput from "./UrlInput.tsx";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";

export default function SearchInput() {
  const activeTab = useActiveTab();

  const [inputMode, setInputMode] = useState(false);
  const [overrideHostname, setOverrideHostname] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setInputMode(false);

    if (!activeTab?.isLoading) {
      setOverrideHostname(undefined);
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
          <UrlInput
            cancel={() => setInputMode(false)}
            setOverrideHostname={setOverrideHostname}
          />
        ) : (
          <HostnameDisplay
            onClick={() => setInputMode(true)}
            overrideHostname={overrideHostname}
          />
        )}
      </div>
    </div>
  );
}
