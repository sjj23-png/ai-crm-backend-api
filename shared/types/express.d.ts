import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      tenantId: string;
      roleId: string;
      email: string;
    }

    interface Request {
      user?: User;
      tenantId?: string;
    }
  }
}

export {};