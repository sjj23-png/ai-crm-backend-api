import { StrictMode } from "react";


import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/feedback";
import "./index.css";
import { AppProviders } from "@/app/providers/AppProviders";
import {AppRouter} from "./app/router/AppRouter";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>

    </ErrorBoundary>
  </StrictMode>
);