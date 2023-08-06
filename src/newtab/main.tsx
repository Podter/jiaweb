import React from "react";
import ReactDOM from "react-dom/client";

import "@/global.css";
import "@fontsource-variable/inter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="flex items-center justify-center w-full h-screen">
      <h1 className="text-4xl font-bold text-center">Hello, world!</h1>
    </div>
  </React.StrictMode>,
);
