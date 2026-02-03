import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../lib/i18n";
import { ChartProvider } from "@/state/ChartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
<ChartProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ChartProvider>
);