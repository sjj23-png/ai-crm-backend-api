"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTenantSchema = void 0;
const zod_1 = require("zod");
exports.CreateTenantSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Organization name is required")
        .max(150, "Organization name is too long"),
    code: zod_1.z
        .string()
        .trim()
        .min(2, "Code must contain at least 2 characters")
        .max(50, "Code is too long")
        .regex(/^[A-Za-z0-9_-]+$/, "Invalid organization code")
        .optional(),
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid organization email"),
    phone: zod_1.z
        .string()
        .trim()
        .min(7)
        .max(20)
        .optional(),
    website: zod_1.z
        .string()
        .trim()
        .url("Invalid website URL")
        .optional(),
    logo: zod_1.z
        .string()
        .trim()
        .url("Invalid logo URL")
        .optional()
});
//# sourceMappingURL=create-tenant.dto.js.map