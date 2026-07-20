import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/sidebar";

import { AppHeader } from "@/components/navigation/header";
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-neutral-200 bg-white lg:flex dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex w-full flex-col">
          <div className="border-b border-neutral-200 p-6 dark:border-neutral-800">
            <h2 className="text-xl font-bold">
              Enterprise CRM
            </h2>
          </div>

          <div className="flex-1 p-4">
            <Sidebar/>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
          check <AppHeader/>
        </header>

        {/* Page */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}