"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jwt_util_1 = require("../utils/jwt.util");
// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string;
//         tenantId: string;
//         roleId: string;
//       };
//     }
//   }
// }
const authGuard = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        req.user = jwt_util_1.JwtUtil.verifyAccessToken(token);
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
exports.authGuard = authGuard;
//# sourceMappingURL=auth.guard.js.map