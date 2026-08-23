"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserOrganizationSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserOrganizationSchema = zod_1.z.object({
    departmentId: zod_1.z.string().cuid(),
    teamId: zod_1.z.string().cuid(),
    designationId: zod_1.z.string().cuid(),
    managerId: zod_1.z.string().cuid().optional()
});
//# sourceMappingURL=update-user-organization.dto.js.map