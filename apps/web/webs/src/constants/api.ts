const api = {


  auth: {
    register: "/auth/register",
    login: "/auth/login",

    logout: "/auth/logout",

    refresh: "/auth/refresh",

    me: "/auth/me",
  },

  users: "/users",

  companies: "/companies",

  departments: "/departments",

  roles: "/roles",

  permissions: "/permissions",

  auditLogs: "/audit-logs",
} as const;

export default api;