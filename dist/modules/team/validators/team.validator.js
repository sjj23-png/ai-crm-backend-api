"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamSchema = exports.createTeamSchema = void 0;
const zod_1 = require("zod");
exports.createTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        departmentId: zod_1.z
            .string()
            .min(1),
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100),
        description: zod_1.z
            .string()
            .max(500)
            .optional(),
        leadId: zod_1.z
            .string()
            .optional(),
    }),
});
exports.updateTeamSchema = zod_1.z.object({
    body: zod_1.z.object({
        departmentId: zod_1.z
            .string()
            .optional(),
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional(),
        description: zod_1.z
            .string()
            .max(500)
            .optional(),
        leadId: zod_1.z
            .string()
            .optional(),
        status: zod_1.z
            .string()
            .optional(),
    }),
});
//# sourceMappingURL=team.validator.js.map