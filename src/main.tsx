import React from "react";
import ReactDOM from "react-dom/client";
import { DiagnosticoWizard } from "@/components/diagnostico-wizard";
import "@/styles/index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DiagnosticoWizard />
    </React.StrictMode>,
  );
}
