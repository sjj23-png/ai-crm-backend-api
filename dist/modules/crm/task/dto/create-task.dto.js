"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskSchema = void 0;
const zod_1 = require("zod");
exports.CreateTaskSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    companyId: zod_1.z.string().cuid().optional(),
    dealId: zod_1.z.string().cuid().optional(),
    stageId: zod_1.z.string().cuid().optional(),
    assignedTo: zod_1.z.string().cuid().optional(),
    title: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(200),
    description: zod_1.z
        .string()
        .optional(),
    status: zod_1.z
        .enum([
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED"
    ])
        .optional(),
    priority: zod_1.z
        .enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT"
    ])
        .optional(),
    dueDate: zod_1.z
        .coerce
        .date()
        .optional()
});
//# sourceMappingURL=create-task.dto.js.map