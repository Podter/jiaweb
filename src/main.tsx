import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import Providers from "./Providers.tsx";

import "./styles.css";
import "@fontsource-variable/inter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
