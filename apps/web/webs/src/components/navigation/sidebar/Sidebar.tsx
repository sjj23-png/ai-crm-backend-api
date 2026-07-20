import SidebarGroup from "./SidebarGroup";
import SidebarFooter from "./SidebarFooter";

import { navigationConfig } from "@/navigation/navigation.config";

export default function Sidebar() {
  return (
    <aside
      className="
        flex
        h-full
        w-full
        flex-col
        bg-white
        dark:bg-neutral-900
      "
    >
      {/* Logo */}

      <div className="border-b border-neutral-200 p-6 dark:border-neutral-800">
        <h1 className="text-xl font-bold tracking-tight">
          Enterprise CRM
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          AI Powered Platform
        </p>
      </div>

      {/* Navigation */}

      <nav
        className="
          flex-1
          space-y-8
          overflow-y-auto
          px-4
          py-6
        "
      >
        {navigationConfig.map((group) => (
          <SidebarGroup
            key={group.id}
            group={group}
          />
        ))}
      </nav>

      <SidebarFooter />
    </aside>
  );
}