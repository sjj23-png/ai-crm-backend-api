import { Navigate, Route, Routes } from "react-router-dom";


import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardHome } from "@/pages/dashboard";
import GuestRoute from "../guards/GuestRoute";

import ProtectedRoute from "../guards/ProtectedRoute";

import LoginPage from "@/pages/auth/LoginPage";
// function LoginPage() {
//   return <div className="p-8">Login Page (Coming Soon)</div>;
// }

// function DashboardPage() {
//   return <div className="p-8"><DashboardHome/></div>;
// }

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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
        </Route>
      </Route>


      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />


    </Routes>
  );
}