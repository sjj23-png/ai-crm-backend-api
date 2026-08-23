"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = require("../repositories/auth.repository");
const register_dto_1 = require("../dto/register.dto");
const jwt_util_1 = require("../utils/jwt.util");
class AuthService {
    authRepository = new auth_repository_1.AuthRepository();
    async register(data, file) {
        const validatedData = register_dto_1.RegisterSchema.parse(data);
        const existingUser = await this.authRepository.findUserByEmail(validatedData.ownerEmail);
        if (existingUser) {
            throw new Error("A user with this email address already exists.");
        }
        if (validatedData.code) {
            const existingTenantByCode = await this.authRepository.findTenantByCode(validatedData.code);
            if (existingTenantByCode) {
                throw new Error("Organization code is already in use.");
            }
        }
        const existingTenantByEmail = await this.authRepository.findTenantByEmail(validatedData.email);
        if (existingTenantByEmail) {
            throw new Error("Organization email is already in use.");
        }
        const passwordHash = await bcrypt_1.default.hash(validatedData.password, Number(process.env.BCRYPT_SALT ?? 10));
        const logo = file ? `/uploads/tenant-logos/${file.filename}` : undefined;
        const result = await this.authRepository.registerTenantAndOwner({
            tenantName: validatedData.name,
            tenantCode: validatedData.code,
            tenantEmail: validatedData.email,
            tenantPhone: validatedData.phone,
            tenantWebsite: validatedData.website,
            logo,
            ownerName: validatedData.ownerName,
            ownerEmail: validatedData.ownerEmail,
            passwordHash,
        });
        return {
            message: "Organization registered successfully.",
            tenant: result.tenant,
            owner: result.user,
        };
    }
    async login(data) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user) {
            throw new Error("Invalid email or password.");
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }
        if (user.status !== "ACTIVE") {
            throw new Error("User account is inactive.");
        }
        const payload = {
            id: user.id,
            tenantId: user.tenantId,
            roleId: user.roleId,
            email: user.email,
        };
        const accessToken = jwt_util_1.JwtUtil.generateAccessToken(payload);
        const refreshToken = jwt_util_1.JwtUtil.generateRefreshToken(payload);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.authRepository.createSession({
            userId: user.id,
            token: refreshToken,
            expiresAt,
        });
        await this.authRepository.createRefreshToken({
            userId: user.id,
            token: refreshToken,
            expiresAt,
        });
        return {
            accessToken,
            refreshToken,
            user,
        };
    }
    async logout(userId) {
        await this.authRepository.deleteUserSessions(userId);
        await this.authRepository.revokeUserRefreshTokens(userId);
        return {
            message: "Logged out successfully.",
        };
    }
    async me(userId) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
    async refreshToken(token) {
        jwt_util_1.JwtUtil.verifyRefreshToken(token);
        const refreshToken = await this.authRepository.findRefreshToken(token);
        if (!refreshToken) {
            throw new Error("Invalid refresh token.");
        }
        if (refreshToken.revoked) {
            throw new Error("Refresh token revoked.");
        }
        if (refreshToken.expiresAt < new Date()) {
            throw new Error("Refresh token expired.");
        }
        const user = await this.authRepository.findUserById(refreshToken.userId);
        if (!user) {
            throw new Error("User not found.");
        }
        const accessToken = jwt_util_1.JwtUtil.generateAccessToken({
            id: user.id,
            tenantId: user.tenantId,
            roleId: user.roleId,
            email: user.email
        });
        return {
            accessToken,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map