"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationSchema = void 0;
const zod_1 = require("zod");
exports.updateOrganizationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100)
            .optional(),
        code: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(30)
            .optional(),
        description: zod_1.z
            .string()
            .trim()
            .max(500)
            .optional(),
    }),
});
//# sourceMappingURL=update-organization.validator.js.map