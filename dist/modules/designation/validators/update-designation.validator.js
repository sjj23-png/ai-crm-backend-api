"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDesignationSchema = void 0;
const zod_1 = require("zod");
exports.updateDesignationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional(),
        description: zod_1.z
            .string()
            .trim()
            .max(500)
            .optional(),
        status: zod_1.z
            .enum([
            "ACTIVE",
            "INACTIVE",
        ])
            .optional(),
    }),
});
//# sourceMappingURL=update-designation.validator.js.map