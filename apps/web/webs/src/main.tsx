import { StrictMode } from "react";
import { ThemeProvider } from "@/design-system/theme";

import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/feedback";
import "./index.css";

import AppProvider from "./providers/AppProvider";

import AppRoutes from "./routes";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>

    </ErrorBoundary>
  </StrictMode>
);
