"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/environment/env");
const authGuard = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                message: "Authentication token is required.",
            });
        }
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization header.",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            tenantId: decoded.tenantId,
            roleId: decoded.roleId,
            email: decoded.email,
        };
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
};
exports.authGuard = authGuard;
//# sourceMappingURL=auth.guard.js.map