import { Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

import { GuestRoute } from "../guards/GuestRoute";
import { ProtectedRoute } from "../guards/ProtectedRoute";

function LoginPage() {
  return <div className="p-8">Login Page (Coming Soon)</div>;
}

function DashboardPage() {
  return <div className="p-8">Dashboard (Coming Soon)</div>;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
      404 | Page Not Found
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />

      <Route path="" element={<Navigate to="/" replace />} />
    </Routes>
  );
}