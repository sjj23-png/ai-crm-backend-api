import { StrictMode } from "react";


import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/feedback";
import "./index.css";
import { AppProviders } from "@/app/providers/AppProviders";
import AppRoutes from "./routes";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>

    </ErrorBoundary>
  </StrictMode>
);