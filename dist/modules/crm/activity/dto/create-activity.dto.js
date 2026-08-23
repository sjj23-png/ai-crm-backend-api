"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActivitySchema = void 0;
const zod_1 = require("zod");
exports.CreateActivitySchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    dealId: zod_1.z.string().cuid().optional(),
    leadId: zod_1.z.string().cuid().optional(),
    companyId: zod_1.z.string().cuid().optional(),
    type: zod_1.z.enum([
        "CREATED",
        "UPDATED",
        "DELETED",
        "STATUS_CHANGED",
        "STAGE_CHANGED",
        "OWNER_CHANGED",
        "COMMENT",
        "NOTE",
        "CALL",
        "EMAIL",
        "MEETING",
        "TASK_CREATED",
        "TASK_COMPLETED"
    ]),
    message: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(1000)
});
//# sourceMappingURL=create-activity.dto.js.map