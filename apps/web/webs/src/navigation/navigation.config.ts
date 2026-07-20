import type { NavigationGroup } from "./navigation.types";


import { NavigationIcons } from "./navigation.icons";

export const navigationConfig: NavigationGroup[] = [
  {
    id: "general",

    title: "General",

    items: [
      {
        id: "dashboard",

        label: "Dashboard",

        path: "/",

        icon: NavigationIcons.dashboard,
      },
    ],
  },

  {
    id: "organization",

    title: "Organization",

    items: [
      {
        id: "companies",

        label: "Companies",

        path: "/companies",

        icon: NavigationIcons.companies,
      },

      {
        id: "users",

        label: "Users",

        path: "/users",

        icon: NavigationIcons.users,
      },

      {
        id: "roles",

        label: "Roles",

        path: "/roles",

        icon: NavigationIcons.roles,
      },
    ],
  },

  {
    id: "crm",

    title: "CRM",

    items: [
      {
        id: "crm",

        label: "CRM",

        path: "/crm",

        icon: NavigationIcons.crm,
      },

      {
        id: "projects",

        label: "Projects",

        path: "/projects",

        icon: NavigationIcons.projects,
      },

      {
        id: "reports",

        label: "Reports",

        path: "/reports",

        icon: NavigationIcons.reports,
      },
    ],
  },

  {
    id: "system",

    title: "System",

    items: [
      {
        id: "settings",

        label: "Settings",

        path: "/settings",

        icon: NavigationIcons.settings,
      },
    ],
  },
];