"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const tenantMiddleware = (req, res, next) => {
    try {
        const tenantId = req.headers["x-tenant-id"] ??
            req.user?.tenantId;
        if (!tenantId) {
            return res.status(400).json({
                message: "Tenant not found.",
            });
        }
        req.tenantId = String(tenantId);
        next();
    }
    catch {
        return res.status(500).json({
            message: "Tenant middleware error.",
        });
    }
};
exports.tenantMiddleware = tenantMiddleware;
//# sourceMappingURL=tenant.middleware.js.map