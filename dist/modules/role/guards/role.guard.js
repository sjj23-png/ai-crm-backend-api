"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = void 0;
const roleGuard = (requiredPermission) => {
    return (req, res, next) => {
        const permissions = req.permissions || new Map();
        if (permissions.get(requiredPermission) !== "ALLOW") {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
exports.roleGuard = roleGuard;
//# sourceMappingURL=role.guard.js.map