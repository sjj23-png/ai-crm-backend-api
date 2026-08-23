"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePipelineSchema = void 0;
const zod_1 = require("zod");
exports.CreatePipelineSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    name: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    description: zod_1.z
        .string()
        .optional(),
    isDefault: zod_1.z
        .boolean()
        .optional(),
    displayOrder: zod_1.z
        .number()
        .int()
        .min(0)
        .optional(),
});
//# sourceMappingURL=create-pipeline.dto.js.map