"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDealSchema = void 0;
const zod_1 = require("zod");
exports.CreateDealSchema = zod_1.z.object({
    tenantId: zod_1.z.string().optional(),
    ownerId: zod_1.z.string().cuid().optional(),
    teamId: zod_1.z.string().cuid().optional(),
    pipelineId: zod_1.z.string().cuid().optional(),
    stageId: zod_1.z.string().cuid().optional(),
    title: zod_1.z.string().min(1).max(200),
    value: zod_1.z.number().positive(),
    currency: zod_1.z.string().default("INR"),
    description: zod_1.z.string().optional(),
});
//# sourceMappingURL=create-deal.dto.js.map