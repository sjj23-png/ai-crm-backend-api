"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamSchema = void 0;
const zod_1 = require("zod");
exports.CreateTeamSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    departmentId: zod_1.z.string().cuid(),
    name: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().optional(),
    leadId: zod_1.z.string().cuid().optional()
});
//# sourceMappingURL=create-team.dto.js.map