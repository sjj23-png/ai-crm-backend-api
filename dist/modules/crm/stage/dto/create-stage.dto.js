"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStageSchema = void 0;
const zod_1 = require("zod");
exports.CreateStageSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    pipelineId: zod_1.z.string().cuid(),
    name: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(100),
    description: zod_1.z
        .string()
        .optional(),
    displayOrder: zod_1.z
        .number()
        .int()
        .min(0)
        .optional(),
    probability: zod_1.z
        .number()
        .int()
        .min(0)
        .max(100)
        .optional(),
    color: zod_1.z
        .string()
        .optional(),
    isWonStage: zod_1.z
        .boolean()
        .optional(),
    isLostStage: zod_1.z
        .boolean()
        .optional(),
});
//# sourceMappingURL=create-stage.dto.js.map