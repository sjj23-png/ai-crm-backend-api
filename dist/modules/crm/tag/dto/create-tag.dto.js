"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagSchema = void 0;
const zod_1 = require("zod");
exports.CreateTagSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    name: zod_1.z.string()
        .min(2)
        .max(100),
    color: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
//# sourceMappingURL=create-tag.dto.js.map