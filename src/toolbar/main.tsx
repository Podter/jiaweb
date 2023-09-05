import React from "react";
import ReactDOM from "react-dom/client";

import { TRPCProvider } from "@/lib/trpc.tsx";
import { ActiveTabProvider } from "./contexts/ActiveTabContext";
import TitleBar from "./components/TitleBar";
import TabBar from "./components/TabBar";

import "@/global.css";
import "@fontsource-variable/inter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TRPCProvider>
      <ActiveTabProvider>
        <TitleBar />
        <TabBar />
      </ActiveTabProvider>
    </TRPCProvider>
  </React.StrictMode>,
);
