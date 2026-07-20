import { NavLink } from "react-router-dom";


import type { NavigationItem } from "@/navigation/navigation.types";

interface SidebarItemProps {
  item: NavigationItem;
}

export default function SidebarItem({
  item,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",

          isActive
            ? "bg-primary-600 text-white"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
        ].join(" ")
      }
    >
      <Icon size={18} />

      <span className="flex-1">
        {item.label}
      </span>

      {item.badge && (
        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}