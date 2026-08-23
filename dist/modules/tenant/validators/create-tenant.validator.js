"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenantSchema = void 0;
const zod_1 = require("zod");
exports.createTenantSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    code: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(30),
    domain: zod_1.z
        .string()
        .trim()
        .optional()
});
//# sourceMappingURL=create-tenant.validator.js.map