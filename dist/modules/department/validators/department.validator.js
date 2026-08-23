"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchema = exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Department name is required")
            .max(100),
        code: zod_1.z
            .string()
            .trim()
            .min(2, "Department code is required")
            .max(30),
        description: zod_1.z
            .string()
            .trim()
            .max(500)
            .optional(),
    }),
});
exports.updateDepartmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional(),
        code: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(30)
            .optional(),
        description: zod_1.z
            .string()
            .trim()
            .max(500)
            .optional(),
        status: zod_1.z
            .enum([
            "ACTIVE",
            "INACTIVE",
            "ARCHIVED",
        ])
            .optional(),
    }),
});
//# sourceMappingURL=department.validator.js.map