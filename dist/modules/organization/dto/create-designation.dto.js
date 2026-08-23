"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDesignationSchema = void 0;
const zod_1 = require("zod");
exports.CreateDesignationSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    name: zod_1.z.string()
        .min(2)
        .max(100),
    description: zod_1.z.string().optional()
});
//# sourceMappingURL=create-designation.dto.js.map