"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    repository = new user_repository_1.UserRepository();
    async create(data) {
        const exists = await this.repository.findByEmail(data.email);
        if (exists) {
            throw new Error("Email already exists.");
        }
        const passwordHash = await bcrypt_1.default.hash(data.password, Number(process.env.BCRYPT_SALT));
        const user = await this.repository.create({
            name: data.name,
            email: data.email,
            passwordHash,
            tenantId: data.tenantId,
            roleId: data.roleId
        });
        return user;
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
    async update(id, data) {
        await this.getById(id);
        if (data.email) {
            const existing = await this.repository.findByEmail(data.email);
            if (existing &&
                existing.id !== id) {
                throw new Error("Email already exists.");
            }
        }
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
        return {
            message: "User deleted successfully."
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map