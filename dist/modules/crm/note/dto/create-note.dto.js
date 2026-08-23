"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteSchema = void 0;
const zod_1 = require("zod");
exports.CreateNoteSchema = zod_1.z.object({
    tenantId: zod_1.z.string().cuid(),
    companyId: zod_1.z.string().cuid().optional(),
    leadId: zod_1.z.string().cuid().optional(),
    dealId: zod_1.z.string().cuid().optional(),
    title: zod_1.z
        .string()
        .trim()
        .min(2)
        .max(200),
    content: zod_1.z
        .string()
        .trim()
        .min(1)
});
//# sourceMappingURL=create-note.dto.js.map