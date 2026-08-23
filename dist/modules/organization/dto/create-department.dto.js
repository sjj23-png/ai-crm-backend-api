"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.CreateDepartmentSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    name: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().optional()
});
//# sourceMappingURL=create-department.dto.js.map