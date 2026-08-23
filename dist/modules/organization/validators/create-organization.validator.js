"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganizationSchema = void 0;
const zod_1 = require("zod");
exports.createOrganizationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(100),
        code: zod_1.z
            .string()
            .trim()
            .min(2)
            .max(30),
        description: zod_1.z
            .string()
            .trim()
            .max(500)
            .optional(),
    }),
});
//# sourceMappingURL=create-organization.validator.js.map