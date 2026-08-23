"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    tenantId: zod_1.z.string().cuid(),
    roleId: zod_1.z.string().cuid(),
    teamId: zod_1.z.string().cuid().optional(),
    designationId: zod_1.z.string().cuid().optional(),
});
//# sourceMappingURL=create-user.dto.js.map