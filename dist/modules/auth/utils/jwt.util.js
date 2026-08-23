"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
}
class JwtUtil {
    static generateAccessToken(payload) {
        const options = {
            expiresIn: (process.env.JWT_EXPIRES_IN || "15m"),
        };
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ||
                "15m"),
        });
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    static verifyRefreshToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return payload;
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtUtil = JwtUtil;
//# sourceMappingURL=jwt.util.js.map