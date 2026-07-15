import type { ReactNode } from "react";


import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../features/auth/context";
import { PageLoader } from "../components/feedback";

import { Suspense } from "react";
interface Props {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: Props) {
  return (
    <BrowserRouter>


      <Suspense
        fallback={<PageLoader />}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}