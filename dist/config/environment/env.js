"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnv(key, required = true) {
    const value = process.env[key];
    if (!value && required) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value || "";
}
exports.env = {
    NODE_ENV: getEnv("NODE_ENV"),
    PORT: parseInt(getEnv("PORT", false)) || 4001,
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
    DIRECT_URL: getEnv("DIRECT_URL", true),
    DATABASE_URL: getEnv("DATABASE_URL", true),
    REDIS_HOST: getEnv("REDIS_HOST", false),
    REDIS_PORT: parseInt(getEnv("REDIS_PORT", false)) || 6379,
    EMAIL_HOST: getEnv("EMAIL_HOST", false),
    EMAIL_PORT: parseInt(getEnv("EMAIL_PORT", false)) || 587,
    EMAIL_USER: getEnv("EMAIL_USER", false),
    EMAIL_PASS: getEnv("EMAIL_PASS", false),
    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", false),
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET", false)
};
//# sourceMappingURL=env.js.map