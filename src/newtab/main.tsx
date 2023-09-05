import React from "react";
import ReactDOM from "react-dom/client";

import "@/global.css";
import "@fontsource-variable/inter";
import "./styles.css";

import { TRPCProvider } from "@/lib/trpc.tsx";
import SearchInput from "./components/SearchInput.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TRPCProvider>
      <div className="flex flex-col items-center justify-center w-full h-screen z-10">
        <h1 className="text-6xl font-bold text-center text-primary-foreground dark:text-foreground mb-8">
          JIΛweb
        </h1>
        <SearchInput />
      </div>
      <div className="w-full h-screen bg-background fixed top-0 bottom-0 left-0 right-0 opacity-20 dark:opacity-30" />
    </TRPCProvider>
  </React.StrictMode>,
);
