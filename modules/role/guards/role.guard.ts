export const roleGuard = (requiredPermission: string) => {
  return (req: any, res: any, next: any) => {

    const permissions = req.permissions || new Map();

    if (permissions.get(requiredPermission) !== "ALLOW") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};